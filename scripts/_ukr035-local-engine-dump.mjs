import { convertText } from '../src/lib/converter/engine.ts';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join('scripts', '_qa-artifacts', 'ukr035');
mkdirSync(OUT, { recursive: true });

const cps = (s) =>
  [...s].map(
    (c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
  );

const forward = [
  'र्य',
  'र्क',
  'र्ग',
  'श्र्य',
  'र्य र्क र्ग श्र्य',
  'कार्य र्य',
  'र्य,',
  'धर्म',
  'कार्य',
  'कार्यक्रम',
  'त्र्य',
];
const reverse = [
  'j~;',
  'j~d',
  'j~x',
  "';Z",
  'Üz',
  'J~;',
  'R;Z',
  'fd k',
  'Z;',
  'pkS',
  '\u2014',
  '\u2013',
  'RZ;',
  'foHkkx Z',
  'd %',
  '1%',
];

const report = { forward: [], reverse: [] };
for (const i of forward) {
  const o = convertText(i, 'uni-to-kd');
  report.forward.push({
    input: i,
    output: o,
    json: JSON.stringify(o),
    cps: cps(o),
  });
  console.log('FWD', JSON.stringify(i), '=>', JSON.stringify(o));
}
for (const i of reverse) {
  const o = convertText(i, 'kd-to-uni');
  const back = convertText(o, 'uni-to-kd');
  report.reverse.push({
    input: i,
    unicode: o,
    unicodeJson: JSON.stringify(o),
    cps: cps(o),
    reencode: back,
    reencodeJson: JSON.stringify(back),
    identityRoundTrip: back === i,
  });
  console.log(
    'REV',
    JSON.stringify(i),
    '=>',
    JSON.stringify(o),
    'reenc',
    JSON.stringify(back),
  );
}

writeFileSync(join(OUT, 'local-engine-dump.json'), JSON.stringify(report, null, 2));
