// Dev helper: crop a region out of a full-page screenshot for close inspection.
const { execFileSync } = require('child_process');
const [, , src, out, x, y, w, h] = process.argv;
const ps = `
Add-Type -AssemblyName System.Drawing
$b = New-Object System.Drawing.Bitmap('${src}')
$r = New-Object System.Drawing.Rectangle(${x}, ${y}, ${w}, ${h})
$c = $b.Clone($r, $b.PixelFormat)
$c.Save('${out}', [System.Drawing.Imaging.ImageFormat]::Png)
$c.Dispose(); $b.Dispose()
Write-Output 'cropped ${out}'
`;
execFileSync('powershell', ['-NoProfile', '-Command', ps], { stdio: 'inherit' });
