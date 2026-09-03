const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = process.argv[2] === '--' ? process.argv[3] : process.argv[2];
const root =
  (process.argv[2] === '--' ? process.argv[4] : process.argv[3]) || process.cwd();

async function squarePng(size, outPath) {
  const buf = await sharp(src)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
  console.log('wrote', path.relative(root, outPath), buf.length);
  return outPath;
}

async function main() {
  if (!src || !fs.existsSync(src)) {
    throw new Error('Source logo PNG required');
  }

  fs.copyFileSync(src, path.join(root, 'public/images/unicodekruti-logo.png'));
  console.log('copied source logo');

  await squarePng(192, path.join(root, 'src/app/icon.png'));
  await squarePng(180, path.join(root, 'public/apple-touch-icon.png'));
  await squarePng(192, path.join(root, 'public/icons/icon-192x192.png'));
  await squarePng(512, path.join(root, 'public/icons/icon-512x512.png'));

  await sharp(src)
    .resize(256, 256, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .webp({ quality: 90 })
    .toFile(path.join(root, 'public/images/icon.webp'));
  console.log('wrote public/images/icon.webp');

  const pngs = [];
  for (const s of [16, 32, 48]) {
    pngs.push(await squarePng(s, path.join(root, 'public', `favicon-${s}.png`)));
  }

  let pngToIco;
  try {
    pngToIco = require('png-to-ico');
  } catch {
    const { execSync } = require('child_process');
    execSync('npm install --no-save png-to-ico', { stdio: 'inherit', cwd: root });
    pngToIco = require('png-to-ico');
  }
  if (typeof pngToIco !== 'function') {
    pngToIco = pngToIco.default || pngToIco.imagesToIco;
  }

  const ico = await pngToIco(pngs);
  fs.writeFileSync(path.join(root, 'public/favicon.ico'), ico);
  fs.writeFileSync(path.join(root, 'src/app/favicon.ico'), ico);
  console.log('wrote favicon.ico');

  for (const p of pngs) fs.unlinkSync(p);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
