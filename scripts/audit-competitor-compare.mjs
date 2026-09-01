/**
 * Side-by-side: UnicodeKruti engine vs krutidevunicodeconverter.com/js/krutiuni.js
 * Usage: npx tsx scripts/audit-competitor-compare.mjs
 */
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enginePath = pathToFileURL(
  path.join(__dirname, '../src/lib/converter/engine.ts')
).href;

const { convertText } = await import(enginePath);

const js = readFileSync(path.join(__dirname, '../.audit-krutiuni.js'), 'utf8');
const krMatch = js.match(/var kruti_array = new Array\(([\s\S]*?)\);/);
const uniMatch = js.match(/var unicode_array = new Array\(([\s\S]*?)\);/);
if (!krMatch || !uniMatch) throw new Error('Could not parse competitor arrays');

function parseArray(src) {
  return [...src.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((m) =>
    m[1].replace(/\\"/g, '"')
  );
}

const kruti_array = parseArray(krMatch[1]);
const unicode_array = parseArray(uniMatch[1]);

function competitorKrutiToUnicode(input) {
  let kruti_text = input;
  const kruti_array_length = kruti_array.length;

  for (let input_symbol_idx = 0; input_symbol_idx < kruti_array_length; input_symbol_idx++) {
    let idx = 0;
    while (idx !== -1) {
      kruti_text = kruti_text.replace(
        kruti_array[input_symbol_idx],
        unicode_array[input_symbol_idx]
      );
      idx = kruti_text.indexOf(kruti_array[input_symbol_idx]);
    }
  }

  kruti_text = kruti_text.replace(/±/g, 'Zं');
  kruti_text = kruti_text.replace(/Æ/g, 'र्f');

  let pi = kruti_text.indexOf('f');
  while (pi !== -1) {
    const cni = kruti_text.charAt(pi + 1);
    const ctbr = 'f' + cni;
    kruti_text = kruti_text.replace(ctbr, cni + 'ि');
    pi = kruti_text.search(/f/, pi + 1);
  }

  kruti_text = kruti_text.replace(/Ç/g, 'fa');
  kruti_text = kruti_text.replace(/É/g, 'र्fa');

  pi = kruti_text.indexOf('fa');
  while (pi !== -1) {
    const cntip2 = kruti_text.charAt(pi + 2);
    const ctbr = 'fa' + cntip2;
    kruti_text = kruti_text.replace(ctbr, cntip2 + 'िं');
    pi = kruti_text.search(/fa/, pi + 2);
  }

  kruti_text = kruti_text.replace(/Ê/g, 'ीZ');

  let powe = kruti_text.indexOf('ि्');
  while (powe !== -1) {
    const cntwe = kruti_text.charAt(powe + 2);
    const ctbr = 'ि्' + cntwe;
    kruti_text = kruti_text.replace(ctbr, '्' + cntwe + 'ि');
    powe = kruti_text.search(/ि्/, powe + 2);
  }

  const matraslist = 'अ आ इ ई उ ऊ ए ऐ ओ औ ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ';
  let rpos = kruti_text.indexOf('Z');
  while (rpos > 0) {
    let pphr = rpos - 1;
    let chtr = kruti_text.charAt(pphr);
    while (matraslist.match(chtr) != null) {
      pphr = pphr - 1;
      chtr = kruti_text.charAt(pphr);
    }
    let ctbr = kruti_text.substr(pphr, rpos - pphr);
    const rstr = 'र्' + ctbr;
    ctbr = ctbr + 'Z';
    kruti_text = kruti_text.replace(ctbr, rstr);
    rpos = kruti_text.indexOf('Z');
  }

  return kruti_text;
}

// Re-read competitor file - É line says "र्दfa" in my port but original says "र्दf" for Æ and "र्दfa" - check original
// Original line 76: kruti_text.replace( /É/g , "र्दfa" ) - wait original says "र्दfa" no - line 76: "र्दfa" - actually "र्दfa" in file is "र्दfa" - let me check read output line 76: `kruti_text = kruti_text.replace( /É/g , "र्दfa" )` - original has "र्दfa" - I had typo र्द vs र् - fix script

function cp(s) {
  return [...s].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(' ');
}

const CASES = [
  'ueLrs Hkkjr',
  'jke',
  'Hkkjrh;',
  'pkj',
  'tkud',
  'fgUnh',
  'fgUnh gS',
  'dqfr nsO d',
  'e.kZdh;kj',
];

console.log('=== COMPETITOR vs UnicodeKruti (KrutiDev → Unicode) ===\n');
console.log('Competitor source: krutidevunicodeconverter.com/js/krutiuni.js\n');

let match = 0;
let diff = 0;
const forReview = [];

for (const kd of CASES) {
  const ours = convertText(kd, 'kd-to-uni');
  const theirs = competitorKrutiToUnicode(kd);
  const same = ours === theirs;
  if (same) match++;
  else {
    diff++;
    forReview.push({ kd, ours, theirs });
  }
  console.log(`${same ? 'MATCH' : 'DIFF'}  ${kd}`);
  console.log(`  UnicodeKruti:  ${ours}`);
  console.log(`  Competitor:    ${theirs}`);
  if (!same) {
    console.log(`  Ours CP:       ${cp(ours)}`);
    console.log(`  Their CP:      ${cp(theirs)}`);
  }
  console.log('');
}

console.log(`Summary: ${match}/${CASES.length} match, ${diff} differ`);
if (forReview.length) {
  console.log('\n=== FLAGGED FOR HINDI REVIEW ===');
  for (const r of forReview) {
    console.log(`- ${r.kd}`);
    console.log(`  Yours:       ${r.ours}`);
    console.log(`  Competitor:  ${r.theirs}`);
  }
}
