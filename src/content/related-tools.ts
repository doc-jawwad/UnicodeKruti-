export type RelatedToolIcon = 'u2k' | 'k2u' | 'font' | 'version';

export type RelatedTool = {
  /** Card title — secondary / intent phrasing (not exact primaryKw on every page). */
  name: string;
  path: string;
  description: string;
  /** Section CTA — action + keyword variation. */
  cta: string;
  /** Compact rail CTA — short relevant anchor (never generic “Open”). */
  railCta: string;
  icon: RelatedToolIcon;
};

export type RelatedToolsVariant = 'compact' | 'section';

/**
 * Related-tool cards for internal links.
 * Titles/CTAs use secondary & intent phrases so we do not repeat each page’s
 * exact primaryKw as the only sitewide anchor text (see keyword-map.ts).
 */
export const RELATED_TOOLS: RelatedTool[] = [
  {
    name: 'Mangal / Unicode → KrutiDev 010',
    path: '/',
    description: 'Turn Mangal, Nirmala UI, or Google Input Hindi into KrutiDev 010',
    cta: 'Convert Mangal to KrutiDev',
    railCta: 'Mangal → KrutiDev',
    icon: 'u2k',
  },
  {
    name: 'Legacy KrutiDev → Unicode',
    path: '/krutidev-to-unicode-converter',
    description: 'Make KrutiDev readable in Gmail, WhatsApp, NIC portals & web',
    cta: 'Convert KrutiDev to Mangal',
    railCta: 'KrutiDev → Mangal',
    icon: 'k2u',
  },
  {
    name: 'Kurtidev10 → Unicode Hindi',
    path: '/krutidev-10-to-unicode-converter',
    description: 'KrutiDev 10 / kurtidev10 ASCII → modern Unicode Devanagari',
    cta: 'Convert KrutiDev 10 to Unicode',
    railCta: 'KrutiDev 10 → Unicode',
    icon: 'version',
  },
  {
    name: 'Govt KrutiDev 010 → Unicode',
    path: '/krutidev-010-to-unicode-converter',
    description: 'CPCT / government-standard KrutiDev 010 mapping to Unicode',
    cta: 'Convert KrutiDev 010 for CPCT',
    railCta: 'KrutiDev 010 → Unicode',
    icon: 'version',
  },
  {
    name: 'Mangal → KrutiDev 10',
    path: '/unicode-to-krutidev-10-converter',
    description: 'Unicode / Google Input Tools → KrutiDev 10 for exams & DTP',
    cta: 'Convert Unicode to Kurtidev10',
    railCta: 'Unicode → KrutiDev 10',
    icon: 'u2k',
  },
  {
    name: 'Free KrutiDev 010 & 055 TTF',
    path: '/font-download',
    description: 'Download KrutiDev font files for Windows and Mac install',
    cta: 'Download KrutiDev 010 TTF',
    railCta: 'Download KrutiDev TTF',
    icon: 'font',
  },
  {
    name: 'Updesh / Updes ↔ Unicode',
    path: '/updesh-converter',
    description: 'Fix UP government Updesh Remington text both ways',
    cta: 'Convert Updesh to Unicode',
    railCta: 'Updesh → Unicode',
    icon: 'version',
  },
  {
    name: 'Nirmala UI → KrutiDev 010',
    path: '/nirmala-ui-to-krutidev-converter',
    description: 'Windows Nirmala UI, Kokila, or Mangal Hindi → KrutiDev 010',
    cta: 'Convert Nirmala UI to KrutiDev',
    railCta: 'Nirmala → KrutiDev',
    icon: 'u2k',
  },
];

export function normalizeToolPath(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

export function getRelatedTools(currentPath: string): RelatedTool[] {
  const current = normalizeToolPath(currentPath);
  return RELATED_TOOLS.filter((tool) => normalizeToolPath(tool.path) !== current);
}
