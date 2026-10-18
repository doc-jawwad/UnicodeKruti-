/**
 * Frozen copy for /mangal-to-krutidev-converter (Gate 1).
 * FAQ text is the single source for both the visible accordion and FAQPage JSON-LD.
 */
export const mangalMeta = {
  path: '/mangal-to-krutidev-converter',
  title: 'Mangal to KrutiDev Converter: Free Online, Kruti Dev 010',
  description:
    'Mangal to KrutiDev Converter: convert Unicode Hindi to KrutiDev 010 online. Copy the result for Word or DTP, with worked examples and fixes.',
  h1: 'Mangal to KrutiDev Converter — Free Online (Kruti Dev 010)',
  breadcrumbLabel: 'Mangal to KrutiDev Converter',
} as const;

export const mangalFaqs = [
  {
    question: 'Can I convert Hindi text copied from my phone to KrutiDev 010?',
    answer:
      'Yes. Hindi typed on a phone is normally Unicode, which the converter accepts. Paste it, copy the output, and set Kruti Dev 010 in Word or your layout software. The font must be installed for Hindi to display.',
  },
  {
    question: 'Do I need to install KrutiDev 010 to use the online converter?',
    answer:
      'No. The online converter works in your browser without KrutiDev installed. You need the font only where you view or format the converted text, such as Word or CorelDRAW. Without it, you see English letters.',
  },
  {
    question: 'Is it safe to convert important documents using UnicodeKruti?',
    answer:
      "UnicodeKruti converts text in your browser and uses website analytics. This is not a guarantee of confidentiality. For sensitive documents, follow your organisation's rules before pasting text, and review the converted output carefully.",
  },
];
