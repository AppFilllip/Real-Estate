#!/usr/bin/env node
/*
 * Dev helper: full-page screenshots at exact viewport widths, over the DevTools
 * protocol. Chrome's --window-size is clamped by the OS below ~500px, so narrow
 * breakpoints have to be emulated rather than sized.
 *
 *   node tools/shot.js <url> <outDir> [width,width,...]
 */
const { spawn } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [, , url, outDir, widthArg = '1440,1024,768,390'] = process.argv;
const widths = widthArg.split(',').map(Number);
const port = 9334;
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'rd-shot-'));

fs.mkdirSync(outDir, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    'about:blank'
  ],
  { stdio: 'ignore' }
);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let targets = null;
  for (let i = 0; i < 40 && !targets; i += 1) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    } catch {
      await sleep(250);
    }
  }

  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const send = (method, params) =>
    new Promise((resolve) => {
      id += 1;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });
  await new Promise((r) => ws.addEventListener('open', r));
  await send('Page.enable');

  for (const width of widths) {
    /* The viewport stays at a realistic height throughout: the layout uses svh
       units, so growing it to the document height would resize the hero. */
    const viewportHeight = width < 768 ? 844 : 900;
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: viewportHeight,
      deviceScaleFactor: 1,
      mobile: width < 768
    });
    await send('Page.navigate', { url });
    await sleep(2200);

    // Walk down the page so every reveal and lazy image has been in view.
    const height = (
      await send('Runtime.evaluate', {
        expression: `(async () => {
          const step = ${viewportHeight} * 0.8;
          const sleep = ms => new Promise(r => setTimeout(r, ms));
          for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await sleep(140);
          }
          window.scrollTo(0, document.documentElement.scrollHeight);
          await sleep(700);
          window.scrollTo(0, 0);
          await sleep(400);
          return document.documentElement.scrollHeight;
        })()`,
        returnByValue: true,
        awaitPromise: true
      })
    ).result.value;

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height: Math.min(height, 30000), scale: 1 }
    });
    const file = path.join(outDir, `shot-${width}.png`);
    fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
    console.log(`${file}  ${width}x${height}`);
  }

  ws.close();
  chrome.kill();
  process.exit(0);
})();
