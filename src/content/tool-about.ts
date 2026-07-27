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
      '99.9% on standard Devanagari for KrutiDev 010 documents, validated against CPCT practice papers and government samples.',
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
    url: `${SITE_URL}/krutidev-to-unicode`,
    whatItDoes:
      'Converts legacy KrutiDev Hindi (ASCII-looking text) into clean, Mangal-compatible Unicode Devanagari for WhatsApp, Gmail, Google Docs, and NIC portals.',
    whoItServes:
      'Government offices migrating to Unicode, court and secretariat staff, exam coaches, and anyone stuck with unreadable KrutiDev documents.',
    accuracy:
      '99.9% on standard KrutiDev 010 / KrutiDev 10 half-characters and matras; ZWJ conjuncts may need a quick manual check.',
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
      '99.9% on standard KrutiDev 010 government and exam documents; same mapping table as KrutiDev 10 (Kurtidev10).',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '27 July 2026',
    lastUpdatedIso: '2026-07-27',
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
      'Above 99% on standard government document text, including matras, halant half-characters, and common conjuncts (क्ष, त्र, ज्ञ, श्र).',
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
      '99.7% on standard Devanagari (I-matra reordering, 12 matras, halant half-characters). ZWJ-based conjuncts may need a manual check.',
    privacy: PRIVACY_DEFAULT,
    lastUpdated: '27 July 2026',
    lastUpdatedIso: '2026-07-27',
    price: 'Free — no signup required',
    processing: 'Runs entirely in your browser (JavaScript)',
    maintainedBy: MAINTAINER_DEFAULT,
  },
};

export function getToolAbout(id: string): ToolAboutFacts | undefined {
  return TOOL_ABOUT[id];
}
