import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const pages = [
  { file: 'homepage.png', title: 'Unicode to KrutiDev Converter', descriptor: 'Free Online Tool' },
  { file: 'krutidev-to-unicode.png', title: 'KrutiDev to Unicode Converter', descriptor: 'Free Online Tool' },
  { file: 'unicode-to-krutidev-10.png', title: 'Unicode to KrutiDev 10 Converter', descriptor: 'Free Online Tool' },
  { file: 'font-download.png', title: 'KrutiDev Font Download', descriptor: 'Free TTF Files' },
  { file: 'about-us.png', title: 'About UnicodeKruti', descriptor: 'Hindi Typing Tools' },
];

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

fs.mkdirSync(path.join('public', 'og'), { recursive: true });

for (const p of pages) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff7ed"/>
      <stop offset="45%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#ffedd5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="64" y="120" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="800" fill="#ff6600">UnicodeKruti</text>
  <text x="64" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="800" fill="#0f172a">${escapeXml(p.title)}</text>
  <text x="64" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="600" fill="#334155">${escapeXml(p.descriptor)}</text>
</svg>`;
  const out = path.join('public', 'og', p.file);
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log('wrote', out);
}
