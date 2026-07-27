/**
 * Keyword cannibalization prevention map (authoritative).
 *
 * Rules from strategy / remediation:
 * - Home owns generic Unicode → KrutiDev (defaults to 010)
 * - K2U owns generic KrutiDev → Unicode (hub for all KD→Unicode)
 * - K10 owns “KrutiDev 10 / Kurtidev10 → Unicode” naming searches
 * - K010 owns “KrutiDev 010 → Unicode” government-standard searches
 * - U2K10 owns “Unicode → KrutiDev 10” (reverse of K10)
 * - Font owns “KrutiDev font download”
 *
 * No two rows may share the same primaryKw.
 * Secondary KWs may overlap across pages; primaries must not.
 */
export type KeywordPage = {
  path: string;
  primaryKw: string;
  secondaryKws: string[];
  title: string;
  h1: string;
  intent: string;
};

export const KEYWORD_MAP: KeywordPage[] = [
  {
    path: '/',
    primaryKw: 'unicode to krutidev converter',
    secondaryKws: [
      'mangal to krutidev',
      'unicode to krutidev 010',
      'hindi unicode to krutidev',
      'cpct krutidev converter',
    ],
    title: 'Free Unicode to KrutiDev Converter Online',
    h1: 'Unicode to KrutiDev Converter — Free Online Tool',
    intent: 'Unicode → KrutiDev 010 (default government / exam direction)',
  },
  {
    path: '/krutidev-to-unicode',
    primaryKw: 'krutidev to unicode converter',
    secondaryKws: [
      'krutidev to mangal',
      'non unicode to unicode hindi',
      'krutidev unicode converter online',
    ],
    title: 'KrutiDev to Unicode Converter — Free Online Tool',
    h1: 'KrutiDev to Unicode Converter — Free Online Tool',
    intent: 'KrutiDev → Unicode hub (all versions; links out to 10 / 010 pages)',
  },
  {
    path: '/krutidev-10-to-unicode-converter',
    primaryKw: 'krutidev 10 to unicode converter',
    secondaryKws: [
      'kurtidev10 to unicode',
      'kruti dev 10 to unicode',
      'k10 to unicode',
      'krutidev10 to mangal',
    ],
    title: 'KrutiDev 10 (Kurtidev10) to Unicode Converter — Free Online Tool',
    h1: 'KrutiDev 10 to Unicode Converter',
    intent: 'Kurtidev10 / KrutiDev 10 naming searches → Unicode',
  },
  {
    path: '/krutidev-010-to-unicode-converter',
    primaryKw: 'krutidev 010 to unicode converter',
    secondaryKws: [
      'krutidev 010 to mangal',
      'cpct krutidev 010 to unicode',
      'government krutidev 010 converter',
    ],
    title: 'KrutiDev 010 to Unicode Converter — Free Online Tool',
    h1: 'KrutiDev 010 to Unicode Converter',
    intent: 'Official KrutiDev 010 government standard → Unicode',
  },
  {
    path: '/unicode-to-krutidev-10-converter',
    primaryKw: 'unicode to krutidev 10 converter',
    secondaryKws: [
      'mangal to krutidev 10',
      'unicode to kurtidev10',
      'google input tools to krutidev 10',
    ],
    title: 'Unicode to KrutiDev 10 Converter — Free',
    h1: 'Convert Unicode Hindi Text to KrutiDev 10 — Free Online Tool',
    intent: 'Unicode → KrutiDev 10 (exam / Remington practice direction)',
  },
  {
    path: '/font-download',
    primaryKw: 'krutidev font download',
    secondaryKws: [
      'krutidev 010 download',
      'kruti dev 010 ttf',
      'download krutidev font windows',
      'krutidev 055 download',
    ],
    title: 'KrutiDev Font Download Free — All Versions',
    h1: 'Download KrutiDev Font Free — TTF Files for Windows and Mac',
    intent: 'TTF install / font file downloads (not conversion)',
  },
];

/** Returns duplicate primary keywords if any (should always be empty). */
export function findPrimaryKwCollisions(): { primaryKw: string; paths: string[] }[] {
  const byKw = new Map<string, string[]>();
  for (const row of KEYWORD_MAP) {
    const key = row.primaryKw.toLowerCase().trim();
    if (!byKw.has(key)) byKw.set(key, []);
    byKw.get(key)!.push(row.path);
  }
  return [...byKw.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([primaryKw, paths]) => ({ primaryKw, paths }));
}
