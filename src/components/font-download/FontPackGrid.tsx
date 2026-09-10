'use client';

import { useEffect, useRef, useState } from 'react';
import { FONT_PACK, fontPackFamily } from '@/lib/site';
import FontDownloadButton from '@/components/font-download/FontDownloadButton';

/**
 * Font pack grid with live glyph samples. Only injects @font-face (and thus
 * downloads TTF) for cards that scroll into view — avoids ~900KB of parallel
 * font fetches on first paint of /font-download.
 */
export default function FontPackGrid() {
  const fonts = [...FONT_PACK].sort((a, b) => a.sort - b.sort);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const rootRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>('[data-font-file]');
    if (!items.length) return;

    const reveal = (file: string) => {
      setLoaded((prev) => (prev[file] ? prev : { ...prev, [file]: true }));
    };

    // Eagerly load the first visible card (010) for LCP sample without waiting
    const first = items[0]?.dataset.fontFile;
    if (first) reveal(first);

    if (typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => {
        const file = el.dataset.fontFile;
        if (file) reveal(file);
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const file = (entry.target as HTMLElement).dataset.fontFile;
          if (file) {
            reveal(file);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '120px 0px', threshold: 0.01 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const faceCss = fonts
    .filter((font) => loaded[font.file])
    .map((font) => {
      const family = fontPackFamily(font.file);
      return `@font-face{font-family:'${family}';src:url('/fonts/${font.file}') format('truetype');font-display:optional;font-weight:normal;font-style:normal;}`;
    })
    .join('');

  return (
    <>
      {faceCss ? <style dangerouslySetInnerHTML={{ __html: faceCss }} /> : null}
      <ul className="font-pack__grid" ref={rootRef}>
        {fonts.map((font) => {
          const family = fontPackFamily(font.file);
          const active = Boolean(loaded[font.file]);
          return (
            <li
              key={font.file}
              className="font-pack__item"
              data-font-file={font.file}
            >
              <div className="font-pack__meta">
                <span className="font-pack__name">{font.name}</span>
                <span className="font-pack__file">{font.file}</span>
                <span className="font-pack__note">{font.note}</span>
                <p
                  className="font-pack__sample"
                  style={
                    active
                      ? { fontFamily: `'${family}', sans-serif` }
                      : undefined
                  }
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
