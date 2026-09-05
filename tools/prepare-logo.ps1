# Trims the padding from the source Rajdhara logo JPG and unmixes its flat
# light-grey background into an alpha channel, so the mark can sit on white,
# off-white or navy without a visible plate behind it.
Add-Type -AssemblyName System.Drawing

$root   = Split-Path -Parent $PSScriptRoot
$src    = Join-Path $root 'rajdhara_web_assets\brand\rajdhara-logo.jpg'
$outDir = Join-Path $root 'public\brand'

$bmp = New-Object System.Drawing.Bitmap($src)
$w = $bmp.Width; $h = $bmp.Height
$rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$stride = $data.Stride
$buf = New-Object byte[] ($stride * $h)
[System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $buf, 0, $buf.Length)
$bmp.UnlockBits($data)
$bmp.Dispose()

# Background sampled from the top-left corner (flat plate in the source file).
$bgB = [int]$buf[0]; $bgG = [int]$buf[1]; $bgR = [int]$buf[2]
Write-Output ("background rgb({0},{1},{2})" -f $bgR, $bgG, $bgB)

$thresh = 20
$minX = $w; $minY = $h; $maxX = -1; $maxY = -1
$rowInk = New-Object int[] $h

for ($y = 0; $y -lt $h; $y++) {
  $o = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    $i = $o + $x * 4
    $d = [Math]::Max([Math]::Abs([int]$buf[$i] - $bgB), [Math]::Max([Math]::Abs([int]$buf[$i+1] - $bgG), [Math]::Abs([int]$buf[$i+2] - $bgR)))
    if ($d -gt $thresh) {
      $rowInk[$y]++
      if ($x -lt $minX) { $minX = $x }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}
Write-Output ("content bbox x {0}..{1}  y {2}..{3}" -f $minX, $maxX, $minY, $maxY)

# Find the widest empty band inside the content box: that gap separates the
# RD monogram from the RAJDHARA wordmark, which gives us a standalone mark.
$gapStart = -1; $gapEnd = -1; $bestLen = 0; $curStart = -1
$gapSearchEnd = [int]($minY + ($maxY - $minY) * 0.70)
for ($y = $minY; $y -le $gapSearchEnd; $y++) {
  if ($rowInk[$y] -lt 3) {
    if ($curStart -lt 0) { $curStart = $y }
  } else {
    if ($curStart -ge 0) {
      $len = $y - $curStart
      if ($len -gt $bestLen) { $bestLen = $len; $gapStart = $curStart; $gapEnd = $y }
      $curStart = -1
    }
  }
}
Write-Output ("largest interior gap rows {0}..{1} ({2}px)" -f $gapStart, $gapEnd, $bestLen)

function Export-Region {
  param([int]$x0, [int]$y0, [int]$x1, [int]$y1, [string]$file, [int]$pad)

  $x0 = [Math]::Max(0, $x0 - $pad); $y0 = [Math]::Max(0, $y0 - $pad)
  $x1 = [Math]::Min($w - 1, $x1 + $pad); $y1 = [Math]::Min($h - 1, $y1 + $pad)
  $cw = $x1 - $x0 + 1; $ch = $y1 - $y0 + 1

  $out = New-Object System.Drawing.Bitmap($cw, $ch, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $orect = New-Object System.Drawing.Rectangle(0, 0, $cw, $ch)
  $od = $out.LockBits($orect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $ostride = $od.Stride
  $obuf = New-Object byte[] ($ostride * $ch)

  for ($y = 0; $y -lt $ch; $y++) {
    $so = ($y + $y0) * $stride
    $do_ = $y * $ostride
    for ($x = 0; $x -lt $cw; $x++) {
      $si = $so + ($x + $x0) * 4
      $b = [int]$buf[$si]; $g = [int]$buf[$si+1]; $r = [int]$buf[$si+2]

      # Coverage = how far the pixel has been pulled away from the flat plate.
      $ab = ($bgB - $b) / [double]$bgB
      $ag = ($bgG - $g) / [double]$bgG
      $ar = ($bgR - $r) / [double]$bgR
      $a = [Math]::Max($ab, [Math]::Max($ag, $ar))
      $a = ($a - 0.02) / 0.80
      if ($a -lt 0) { $a = 0 }
      if ($a -gt 1) { $a = 1 }

      $di = $do_ + $x * 4
      if ($a -le 0.004) {
        $obuf[$di] = 0; $obuf[$di+1] = 0; $obuf[$di+2] = 0; $obuf[$di+3] = 0
      } else {
        # Un-blend the plate back out so edges stay clean over any surface.
        $ur = ($r - $bgR * (1 - $a)) / $a
        $ug = ($g - $bgG * (1 - $a)) / $a
        $ub = ($b - $bgB * (1 - $a)) / $a
        $obuf[$di]   = [byte][Math]::Min(255, [Math]::Max(0, [Math]::Round($ub)))
        $obuf[$di+1] = [byte][Math]::Min(255, [Math]::Max(0, [Math]::Round($ug)))
        $obuf[$di+2] = [byte][Math]::Min(255, [Math]::Max(0, [Math]::Round($ur)))
        $obuf[$di+3] = [byte][Math]::Round($a * 255)
      }
    }
  }

  [System.Runtime.InteropServices.Marshal]::Copy($obuf, 0, $od.Scan0, $obuf.Length)
  $out.UnlockBits($od)
  $path = Join-Path $outDir $file
  $out.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  Write-Host ("wrote {0}  {1}x{2}" -f $file, $cw, $ch)
  return $out
}

$full = Export-Region -x0 $minX -y0 $minY -x1 $maxX -y1 $maxY -file 'rajdhara-logo.png' -pad 14
$full.Dispose()

if ($gapStart -gt 0) {
  $markBottom = $gapStart - 1
} else {
  $markBottom = [int]($minY + ($maxY - $minY) * 0.55)
}

# Tighten the monogram crop horizontally: the wordmark below it is wider.
$mkMinX = $w; $mkMaxX = -1
for ($y = $minY; $y -le $markBottom; $y++) {
  $o = $y * $stride
  for ($x = 0; $x -lt $w; $x++) {
    $i = $o + $x * 4
    $d = [Math]::Max([Math]::Abs([int]$buf[$i] - $bgB), [Math]::Max([Math]::Abs([int]$buf[$i+1] - $bgG), [Math]::Abs([int]$buf[$i+2] - $bgR)))
    if ($d -gt $thresh) {
      if ($x -lt $mkMinX) { $mkMinX = $x }
      if ($x -gt $mkMaxX) { $mkMaxX = $x }
    }
  }
}
Write-Output ('mark bbox x {0}..{1}  y {2}..{3}' -f $mkMinX, $mkMaxX, $minY, $markBottom)
$mark = Export-Region -x0 $mkMinX -y0 $minY -x1 $mkMaxX -y1 $markBottom -file 'rajdhara-mark.png' -pad 10

# Square favicon derived from the monogram.
$size = 256
$fav = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gfx = [System.Drawing.Graphics]::FromImage($fav)
$gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$scale = [Math]::Min(($size * 0.88) / $mark.Width, ($size * 0.88) / $mark.Height)
$dw = [int]($mark.Width * $scale); $dh = [int]($mark.Height * $scale)
$gfx.DrawImage($mark, [int](($size - $dw) / 2), [int](($size - $dh) / 2), $dw, $dh)
$gfx.Dispose()
$fav.Save((Join-Path $outDir 'favicon.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$fav.Dispose()
$mark.Dispose()
Write-Output "wrote favicon.png 256x256"
