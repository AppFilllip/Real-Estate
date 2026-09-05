// Dev helper: capture the page at the four target widths using headless Chrome.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = process.argv[2] || 'http://localhost:3100/';
const outDir = process.argv[3] || path.join(__dirname, '..', '.shots');
const widths = (process.argv[4] || '1440x2400,1024x2000,768x1800,390x1500').split(',');

fs.mkdirSync(outDir, { recursive: true });
for (const size of widths) {
  const [w, h] = size.split('x');
  const out = path.join(outDir, `shot-${w}.png`);
  execFileSync(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--virtual-time-budget=9000', `--window-size=${w},${h}`,
    `--screenshot=${out}`, url
  ], { stdio: 'ignore' });
  console.log(out, fs.statSync(out).size);
}
