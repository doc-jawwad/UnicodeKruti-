export type RelatedTool = {
  name: string;
  path: string;
  description: string;
};

export type RelatedToolsVariant = 'compact' | 'section';

/** All site tools — used by RelatedTools (excludes current page). */
export const RELATED_TOOLS: RelatedTool[] = [
  {
    name: 'Unicode to KrutiDev Converter',
    path: '/',
    description: 'Convert Mangal/Nirmala UI to KrutiDev 010',
  },
  {
    name: 'KrutiDev to Unicode Converter',
    path: '/krutidev-to-unicode',
    description: 'Convert legacy KrutiDev to Unicode for Gmail and WhatsApp',
  },
  {
    name: 'KrutiDev 10 to Unicode Converter',
    path: '/krutidev-10-to-unicode-converter',
    description: 'KrutiDev 10 (kurtidev10) to Unicode',
  },
  {
    name: 'KrutiDev 010 to Unicode Converter',
    path: '/krutidev-010-to-unicode-converter',
    description: 'Government-standard KrutiDev 010 mapping',
  },
  {
    name: 'Unicode to KrutiDev 10 Converter',
    path: '/unicode-to-krutidev-10-converter',
    description: 'Mangal/Google Input Tools to KrutiDev 10',
  },
  {
    name: 'KrutiDev Font Download',
    path: '/font-download',
    description: 'Free TTF files for Windows and Mac',
  },
];

export function normalizeToolPath(path: string): string {
  return path.replace(/\/+$/, '') || '/';
}

export function getRelatedTools(currentPath: string): RelatedTool[] {
  const current = normalizeToolPath(currentPath);
  return RELATED_TOOLS.filter((tool) => normalizeToolPath(tool.path) !== current);
}
