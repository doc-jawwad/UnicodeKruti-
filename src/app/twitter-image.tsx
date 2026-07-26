import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'UnicodeKruti — Unicode ↔ KrutiDev Converters';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function TwitterImage() {
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
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffffff 45%, #ffedd5 100%)',
          color: '#0f172a',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 700,
            color: '#e65c00',
            letterSpacing: '-0.02em',
          }}
        >
          UnicodeKruti
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Free Unicode ↔ KrutiDev converters
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            fontSize: 28,
            color: '#334155',
            maxWidth: 900,
          }}
        >
          Browser-only Hindi font conversion for CPCT, government offices, and DTP
        </div>
      </div>
    ),
    { ...size }
  );
}
