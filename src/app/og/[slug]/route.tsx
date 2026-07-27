import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const PAGES: Record<
  string,
  { title: string; descriptor: string }
> = {
  'homepage.png': {
    title: 'Unicode to KrutiDev Converter',
    descriptor: 'Free Online Tool',
  },
  'krutidev-to-unicode.png': {
    title: 'KrutiDev to Unicode Converter',
    descriptor: 'Free Online Tool',
  },
  'unicode-to-krutidev-10.png': {
    title: 'Unicode to KrutiDev 10 Converter',
    descriptor: 'Free Online Tool',
  },
  'font-download.png': {
    title: 'KrutiDev Font Download',
    descriptor: 'Free TTF Files',
  },
  'about-us.png': {
    title: 'About UnicodeKruti',
    descriptor: 'Hindi Typing Tools',
  },
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const page = PAGES[slug] || {
    title: 'UnicodeKruti',
    descriptor: 'Unicode ↔ KrutiDev',
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 42%, #ffedd5 100%)',
          color: '#0f172a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 800,
            color: '#ff6600',
            letterSpacing: '-0.02em',
          }}
        >
          UnicodeKruti
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 54,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {page.title}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 22,
            fontSize: 30,
            color: '#334155',
            maxWidth: 900,
          }}
        >
          {page.descriptor}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
