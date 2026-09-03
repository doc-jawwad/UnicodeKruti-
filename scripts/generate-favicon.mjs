import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'public/icons/icon-192x192.png');

async function main() {
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(
    sizes.map((s) => sharp(src).resize(s, s).png().toBuffer())
  );

  const headerSize = 6 + sizes.length * 16;
  let offset = headerSize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  for (let i = 0; i < sizes.length; i++) {
    const o = 6 + i * 16;
    const dim = sizes[i] >= 256 ? 0 : sizes[i];
    header.writeUInt8(dim, o);
    header.writeUInt8(dim, o + 1);
    header.writeUInt8(0, o + 2);
    header.writeUInt8(0, o + 3);
    header.writeUInt16LE(1, o + 4);
    header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(pngs[i].length, o + 8);
    header.writeUInt32LE(offset, o + 12);
    offset += pngs[i].length;
  }
  const ico = Buffer.concat([header, ...pngs]);

  await writeFile(join(root, 'public/favicon.ico'), ico);
  await mkdir(join(root, 'src/app'), { recursive: true });
  await writeFile(join(root, 'src/app/favicon.ico'), ico);
  await sharp(src).resize(32, 32).png().toFile(join(root, 'src/app/icon.png'));
  await sharp(src)
    .resize(180, 180)
    .png()
    .toFile(join(root, 'public/apple-touch-icon.png'));

  console.log('Wrote favicon.ico, src/app/icon.png, apple-touch-icon.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
