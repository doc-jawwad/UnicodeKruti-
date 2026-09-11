import { SITE_URL } from '@/lib/site';

export type ToolAboutFacts = {
  id: string;
  name: string;
  url: string;
  whatItDoes: string;
  whoItServes: string;
  accuracy: string;
  privacy: string;
  lastUpdated: string;
  lastUpdatedIso: string;
  price?: string;
  processing?: string;
  maintainedBy?: string;
};

const PRIVACY_DEFAULT =
  'Browser-only conversion — pasted text is not uploaded to our servers. See our Privacy Policy.';

const MAINTAINER_DEFAULT = 'Akshay Verma, Software Developer and Hindi Typing Expert';

/** Canonical “About the tool” citation facts for each converter page. */
export const TOOL_ABOUT: Record<string, ToolAboutFacts> = {
  home: {
    id: 'home',
    name: 'Unicode to KrutiDev Converter',
    url: SITE_URL,
    whatItDoes:
      'Converts Unicode Devanagari Hindi (Mangal, Kokila, Google Input Tools, InScript) into KrutiDev 010 encoding for legacy government and DTP workflows.',
    whoItServes:
      'CPCT and state typing exam candidates, government typists, coaching institutes, and PageMaker / CorelDRAW DTP operators.',
    accuracy:
      'Inverse of the Remington 010 table. Uni→KD→Uni is NFC-equal for supported Devanagari. Reph encodes as Z. Mixed Latin in Unicode is left unchanged.',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '27 July 2026',
    lastUpdatedIso: '2026-07-27',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
  'krutidev-to-unicode': {
    id: 'krutidev-to-unicode',
    name: 'KrutiDev to Unicode Converter',
    url: `${SITE_URL}/krutidev-to-unicode-converter`,
    whatItDoes:
      'Converts legacy KrutiDev Hindi (ASCII-looking text) into clean, Mangal-compatible Unicode Devanagari for WhatsApp, Gmail, Google Docs, and NIC portals.',
    whoItServes:
      'Government offices migrating to Unicode, court and secretariat staff, exam coaches, and anyone stuck with unreadable KrutiDev documents.',
    accuracy:
      'Regression-tested Remington KrutiDev 010 / 10 mapping (SIL + LTRC): Z-reph, z-rakar, 12 matras, half-forms, nukta, and common conjuncts. KrutiDev 055 is not converted. Mixed Latin letters in KrutiDev ASCII are encoding keys, not English.',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '27 July 2026',
    lastUpdatedIso: '2026-07-27',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
  'krutidev-010': {
    id: 'krutidev-010',
    name: 'KrutiDev 010 to Unicode Converter',
    url: `${SITE_URL}/krutidev-010-to-unicode-converter`,
    whatItDoes:
      'Converts India’s official KrutiDev 010 government Hindi typing standard into Unicode Devanagari that works on every modern device and portal.',
    whoItServes:
      'CPCT (Madhya Pradesh), UPSSSC, Rajasthan Patwari, BPSC candidates, and departmental typists who work in KrutiDev 010 daily.',
    accuracy:
      'SIL KrutiDev 010 mapping (TECkit) with Remington/LTRC sequence rules; verified against tests/krutidev010 and scripts/fixtures/krutidev010 (11 September 2026). Same table as KrutiDev 10. ASCII digits preserved; Latin letters are encoding, not English. Does not convert KrutiDev 055.',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '11 September 2026',
    lastUpdatedIso: '2026-09-11',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
  'krutidev-10': {
    id: 'krutidev-10',
    name: 'KrutiDev 10 to Unicode Converter',
    url: `${SITE_URL}/krutidev-10-to-unicode-converter`,
    whatItDoes:
      'Converts KrutiDev 10 / Kurtidev10 / Kruti Dev 10 Hindi into Unicode Devanagari. Same mapping as KrutiDev 010 — built for Kurtidev10 search naming.',
    whoItServes:
      'Users searching for Kurtidev10, coaching centres, and offices that label their font as KrutiDev 10 rather than 010.',
    accuracy:
      'Same mapping as KrutiDev 010. 100% of the verified Remington/SIL regression corpus (reph, rakar, matras, half-forms, conjuncts). ASCII digits stay Latin; % after a digit is a colon (SIL).',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '27 July 2026',
    lastUpdatedIso: '2026-07-27',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
  'unicode-to-krutidev-10': {
    id: 'unicode-to-krutidev-10',
    name: 'Unicode to KrutiDev 10 Converter',
    url: `${SITE_URL}/unicode-to-krutidev-10-converter`,
    whatItDoes:
      'Converts Unicode Hindi from Mangal, Google Input Tools, or InScript into KrutiDev 10 (Kurtidev10) encoding for exams and legacy DTP software.',
    whoItServes:
      'Exam candidates practising in Unicode who need KrutiDev 10 output, coaching institutes, and reverse-direction DTP workflows.',
    accuracy:
      'Inverse of the same Remington table. Uni→KD→Uni is NFC-equal for supported Devanagari. Reph encodes as Z; original DTP files that used j~ are decode-equivalent, not always byte-equal.',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '27 July 2026',
    lastUpdatedIso: '2026-07-27',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
  updesh: {
    id: 'updesh',
    name: 'Updesh Font Converter',
    url: `${SITE_URL}/updesh-converter`,
    whatItDoes:
      'Converts Hindi text between Updesh encoding and Unicode in both directions. Updesh uses the same Remington ASCII map as KrutiDev 010 for UP government and UPDES NIC workflows.',
    whoItServes:
      'UP government typists, UPSSSC and UPPSC candidates, UP district court staff, Rajbhasha compliance officers, and Hindi DTP professionals.',
    accuracy:
      'SIL / Remington KrutiDev 010 map (Z-reph, z-rakar, sihaari reorder). Latin Remington keys are not passed through as English in Updesh → Unicode. 055 and Chandni are not converted.',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '11 September 2026',
    lastUpdatedIso: '2026-09-11',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
  'nirmala-ui-to-krutidev': {
    id: 'nirmala-ui-to-krutidev',
    name: 'Nirmala UI to KrutiDev Converter',
    url: `${SITE_URL}/nirmala-ui-to-krutidev-converter`,
    whatItDoes:
      'Converts Nirmala UI Unicode Hindi — and Mangal, Kokila, or any standard Unicode Devanagari — into KrutiDev 010 encoding for exams, government templates, and legacy DTP.',
    whoItServes:
      'Windows typists drafting in Nirmala UI, CPCT and state exam candidates, government offices, and DTP operators receiving Unicode Word files.',
    accuracy:
      'Same Unicode→KrutiDev 010 engine as the homepage converter. Uni→KD→Uni is NFC-equal for supported Devanagari.',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '10 September 2026',
    lastUpdatedIso: '2026-09-10',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
};

export function getToolAbout(id: string): ToolAboutFacts | undefined {
  return TOOL_ABOUT[id];
}
