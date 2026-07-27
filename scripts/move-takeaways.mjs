import fs from 'fs';

function moveJsxSection(file, moveId, beforeId) {
  let s = fs.readFileSync(file, 'utf8');
  const findStart = (id) => {
    const re = new RegExp(`<section\\b[^>]*\\bid=["']${id}["'][^>]*>`);
    const m = s.match(re);
    if (!m) return -1;
    return s.indexOf(m[0]);
  };
  const findEnd = (start) => {
    let depth = 0;
    let i = start;
    while (i < s.length) {
      if (s.slice(i).startsWith('<section')) {
        depth += 1;
        i += 8;
        continue;
      }
      if (s.slice(i).startsWith('</section>')) {
        depth -= 1;
        i += 10;
        if (depth === 0) return i;
        continue;
      }
      i += 1;
    }
    return -1;
  };
  const mStart = findStart(moveId);
  const bStart = findStart(beforeId);
  if (mStart < 0 || bStart < 0) throw new Error(`${file} missing ${moveId} or ${beforeId}`);
  if (mStart < bStart) {
    console.log(`${file}: already ordered`);
    s = s.replace(/aria-label="Key takeaways summary"/g, 'aria-label="Key takeaways"');
    fs.writeFileSync(file, s);
    return;
  }
  const mEnd = findEnd(mStart);
  const block = s.slice(mStart, mEnd);
  s = s.slice(0, mStart) + s.slice(mEnd);
  const re = new RegExp(`<section\\b[^>]*\\bid=["']${beforeId}["'][^>]*>`);
  const m = s.match(re);
  const bStart2 = s.indexOf(m[0]);
  s = s.slice(0, bStart2) + block + '\n\n      ' + s.slice(bStart2);
  s = s.replace(/aria-label="Key takeaways summary"/g, 'aria-label="Key takeaways"');
  fs.writeFileSync(file, s);
  console.log(`Moved #${moveId} before #${beforeId} in ${file}`);
}

moveJsxSection('src/components/pages/u2k10/U2K10PageBody.tsx', 'key-takeaways', 'faq');
moveJsxSection(
  'src/components/pages/font-download/FontDownloadPageBody.tsx',
  'key-takeaways',
  'faq',
);
