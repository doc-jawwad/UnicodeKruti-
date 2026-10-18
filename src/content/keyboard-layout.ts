/**
 * Copy shared by the /krutidev-keyboard-layout page, its JSON-LD and the PDF.
 * Visible FAQ reads `keyboardLayoutFaqs` (no FAQPage JSON-LD on this page).
 */

export const KEYBOARD_LAYOUT_PATH = '/krutidev-keyboard-layout';

export const KEYBOARD_PDF_PATH = '/downloads/kruti-dev-010-keyboard-layout-a4.pdf';

export const keyboardLayoutMeta = {
  title: 'Kruti Dev Keyboard Layout & Hindi Typing Chart PDF | UnicodeKruti',
  description:
    'Kruti Dev keyboard layout with Normal and Shift keys, matras, half letters and reph, plus a printable A4 Hindi typing chart PDF.',
  h1: 'Kruti Dev Keyboard Layout — Hindi Typing Chart & Free PDF',
  breadcrumbLabel: 'Kruti Dev Keyboard Layout',
  tldr: 'If you type Hindi in Kruti Dev 010, you press ordinary English keys and the font draws Hindi letters. This guide shows which key gives which character on the Kruti Dev keyboard, with Normal and Shift keys, matras and half letters.',
  /**
   * Draft / preview content dates (ISO). PDF footer generation label stays in
   * `MAPPING_META.generated` / `generatedLabel` (real PDF build date — do not invent).
   * At production publication, update `datePublished` (first live ship) and
   * `dateModified` to the actual release calendar dates — do not invent a ship date here.
   */
  datePublished: '2026-10-19',
  dateModified: '2026-10-19',
} as const;

export type KeyboardFaq = { question: string; answer: string };

export const keyboardLayoutFaqs: KeyboardFaq[] = [
  {
    question: 'How do I download and print the PDF?',
    answer: 'Use the download button in the PDF section, and print the chart on A4.',
  },
  {
    question: 'Which key types ि?',
    answer:
      "By the converter's rules, f is the stored character for it, and it comes before the consonant. A physical keyboard test is pending.",
  },
  {
    question: 'How do I see Shift keys and half letters?',
    answer:
      'Hold Shift while pressing the key. The Shift table above lists the half letters we have so far.',
  },
  {
    question: 'Is it the same as CPCT Remington (Gail)?',
    answer:
      'Do not assume so. CPCT lists Remington (Gail) and InScript in Unicode, while Kruti Dev 010 is a legacy font.',
  },
  {
    question: 'Can I view the chart on my phone?',
    answer:
      "The key tables are ordinary page text, so you can read them on a phone and use your browser's Find in page.",
  },
  {
    question: 'Do I need the font installed?',
    answer:
      'Yes, if you want to see Hindi shapes in your own document. Without it you see English letters.',
  },
  {
    question: 'Do Alt codes work without a numeric keypad?',
    answer:
      "Microsoft's method needs the numeric keypad, so the number row does not work. See the Alt-code section above.",
  },
];

export const KEYBOARD_REFERENCES = {
  microsoft:
    'https://support.microsoft.com/en-us/office/insert-ascii-or-unicode-latin-based-symbols-and-characters-d13f58d3-7bcb-44a7-a4d5-972ee12e50e0',
  unicodeCh12: 'https://www.unicode.org/versions/Unicode15.1.0/ch12.pdf',
  cpctFaq: 'https://www.cpct.mp.gov.in/per/g01/pub/1172/ASM/WebPortal/1/FAQ.html',
  notoDevanagari: 'https://github.com/notofonts/devanagari',
} as const;
