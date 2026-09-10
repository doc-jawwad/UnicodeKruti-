import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/** Matches OG_IMAGE_BY_PATH in src/lib/seo/metadata.ts (webp preferred). */
const pages = [
  {
    file: 'unicode-to-krutidev.webp',
    title: 'Unicode to KrutiDev Converter — Free Online Tool',
    descriptor: 'Mangal, Nirmala UI, CPCT & UP Govt',
  },
  {
    file: 'krutidev-to-unicode.webp',
    title: 'KrutiDev to Unicode Converter',
    descriptor: 'Free, 99.9% Accurate, Browser-Only',
  },
  {
    file: 'krutidev-10-to-unicode.webp',
    title: 'KrutiDev 10 to Unicode Converter',
    descriptor: 'Kurtidev10 → Unicode for exams & DTP',
  },
  {
    file: 'krutidev-010-to-unicode.webp',
    title: 'KrutiDev 010 to Unicode Converter',
    descriptor: 'Government standard converter',
  },
  {
    file: 'unicode-to-krutidev-10.webp',
    title: 'Unicode to KrutiDev 10 Converter',
    descriptor: 'For Exam Candidates & DTP',
  },
  {
    file: 'updesh-converter.webp',
    title: 'Updesh Font Converter',
    descriptor: 'Updesh / Updes ↔ Unicode',
  },
  {
    file: 'font-download.png',
    title: 'KrutiDev Font Download Free',
    descriptor: '010, 055, Windows & Mac TTF',
  },
  {
    file: 'about-us.png',
    title: 'About UnicodeKruti',
    descriptor: 'Akshay Verma, Hindi Typing Expert',
  },
];

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTitle(title, maxChars = 28) {
  const words = title.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

fs.mkdirSync(path.join('public', 'og'), { recursive: true });

for (const p of pages) {
  const titleLines = wrapTitle(p.title);
  const titleTspans = titleLines
    .map((line, i) => {
      const y = 220 + i * 58;
      return `<text x="64" y="${y}" font-family="Segoe UI, Arial, sans-serif" font-size="46" font-weight="800" fill="#0f172a">${escapeXml(line)}</text>`;
    })
    .join('\n  ');
  const subtitleY = 220 + titleLines.length * 58 + 36;

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
  <rect x="0" y="0" width="12" height="630" fill="#ff6600"/>
  <text x="64" y="120" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" fill="#ff6600">UnicodeKruti</text>
  ${titleTspans}
  <text x="64" y="${subtitleY}" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="600" fill="#475569">${escapeXml(p.descriptor)}</text>
  <text x="64" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#64748b">unicodekruti.com</text>
</svg>`;

  const out = path.join('public', 'og', p.file);
  const pipeline = sharp(Buffer.from(svg)).resize(1200, 630);
  if (p.file.endsWith('.webp')) {
    await pipeline.webp({ quality: 90 }).toFile(out);
  } else {
    await pipeline.png().toFile(out);
  }
  console.log('wrote', out);
}
