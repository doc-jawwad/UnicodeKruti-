export type RelatedToolIcon = 'u2k' | 'k2u' | 'font' | 'version';

export type RelatedTool = {
  name: string;
  path: string;
  description: string;
  /** Short action label shown on the card CTA. */
  cta: string;
  icon: RelatedToolIcon;
};

export type RelatedToolsVariant = 'compact' | 'section';

/** All site tools — used by RelatedTools (excludes current page). */
export const RELATED_TOOLS: RelatedTool[] = [
  {
    name: 'Unicode to KrutiDev Converter',
    path: '/',
    description: 'Convert Mangal / Nirmala UI Hindi to KrutiDev 010',
    cta: 'Convert Unicode → KrutiDev',
    icon: 'u2k',
  },
  {
    name: 'KrutiDev to Unicode Converter',
    path: '/krutidev-to-unicode-converter',
    description: 'Convert legacy KrutiDev for Gmail, WhatsApp & web',
    cta: 'Convert KrutiDev → Unicode',
    icon: 'k2u',
  },
  {
    name: 'KrutiDev 10 to Unicode Converter',
    path: '/krutidev-10-to-unicode-converter',
    description: 'KrutiDev 10 (kurtidev10) → Unicode Hindi',
    cta: 'Open KrutiDev 10 tool',
    icon: 'version',
  },
  {
    name: 'KrutiDev 010 to Unicode Converter',
    path: '/krutidev-010-to-unicode-converter',
    description: 'Government-standard KrutiDev 010 mapping',
    cta: 'Open KrutiDev 010 tool',
    icon: 'version',
  },
  {
    name: 'Unicode to KrutiDev 10 Converter',
    path: '/unicode-to-krutidev-10-converter',
    description: 'Mangal / Google Input Tools → KrutiDev 10',
    cta: 'Convert to KrutiDev 10',
    icon: 'u2k',
  },
  {
    name: 'KrutiDev Font Download',
    path: '/font-download',
    description: 'Free TTF files for Windows and Mac',
    cta: 'Download fonts',
    icon: 'font',
  },
  {
    name: 'Updesh Converter',
    path: '/updesh-converter',
    description: 'Updesh / Updes ↔ Unicode for UP government typing',
    cta: 'Open Updesh converter',
    icon: 'version',
  },
];

export function normalizeToolPath(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

export function getRelatedTools(currentPath: string): RelatedTool[] {
  const current = normalizeToolPath(currentPath);
  return RELATED_TOOLS.filter((tool) => normalizeToolPath(tool.path) !== current);
}
