import { FONT_PACK, fontPackFamily } from '@/lib/site';
import FontDownloadButton from '@/components/font-download/FontDownloadButton';

/** Sorted pack + live glyph samples (KrutiDev ASCII rendered with each TTF). */
export default function FontPackGrid() {
  const fonts = [...FONT_PACK].sort((a, b) => a.sort - b.sort);

  const faceCss = fonts
    .map((font) => {
      const family = fontPackFamily(font.file);
      return `@font-face{font-family:'${family}';src:url('/fonts/${font.file}') format('truetype');font-display:swap;font-weight:normal;font-style:normal;}`;
    })
    .join('');

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: faceCss }} />
      <ul className="font-pack__grid">
        {fonts.map((font) => {
          const family = fontPackFamily(font.file);
          return (
            <li key={font.file} className="font-pack__item">
              <div className="font-pack__meta">
                <span className="font-pack__name">{font.name}</span>
                <span className="font-pack__file">{font.file}</span>
                <span className="font-pack__note">{font.note}</span>
                <p
                  className="font-pack__sample"
                  style={{ fontFamily: `'${family}', sans-serif` }}
                  lang="hi"
                  title="Live preview — नमस्ते भारत in this font"
                  aria-label={`Font sample for ${font.name}: नमस्ते भारत`}
                >
                  {font.sample}
                </p>
                <span className="font-pack__sample-caption">Sample: नमस्ते भारत</span>
              </div>
              <FontDownloadButton
                href={`/fonts/${font.file}`}
                fileName={font.file}
                id={font.file === 'KRDEV010.ttf' ? 'download-krutidev-010' : undefined}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
