#!/usr/bin/env node
/*
 * Dev helper: open a URL in headless Chrome at a given viewport and evaluate an
 * expression in the page, over the DevTools protocol. Used to measure layout
 * (overflow culprits, computed styles) instead of guessing from screenshots.
 *
 *   node tools/inspect.js <url> <width> <height> "<js expression>"
 */
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [, , url, width = '390', height = '900', expression = '1'] = process.argv;
const port = 9333;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'rd-cdp-'));

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`,
    'about:blank'
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function json(pathname) {
  const res = await fetch(`http://127.0.0.1:${port}${pathname}`);
  return res.json();
}

(async () => {
  let targets = null;
  for (let i = 0; i < 40 && !targets; i += 1) {
    try {
      targets = await json('/json/list');
    } catch {
      await sleep(250);
    }
  }
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();

  const send = (method, params) =>
    new Promise((resolve) => {
      id += 1;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });

  await new Promise((r) => ws.addEventListener('open', r));

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: Number(width),
    height: Number(height),
    deviceScaleFactor: 1,
    mobile: Number(width) < 768
  });
  await send('Page.navigate', { url });
  await sleep(3500);

  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true
  });

  console.log(JSON.stringify(result.result?.value ?? result, null, 2));

  ws.close();
  chrome.kill();
  process.exit(0);
})();
