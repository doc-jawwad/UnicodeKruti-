'use client';

/**
 * PDF extract/download helpers.
 *
 * Uses pdfjs-dist **legacy** main + worker (same package version) so browsers
 * without native Uint8Array.prototype.toHex (e.g. Chromium 131) still work.
 * Modern `pdfjs-dist/build/*` assumes that API and fails with
 * `a.toHex is not a function` in the worker.
 *
 * Worker is served from a versioned public URL to avoid PWA/CDN caching an
 * incompatible older worker against a newer library (or vice versa).
 */

export const MAX_PDF_BYTES = 8 * 1024 * 1024;
export const MAX_PDF_PAGES = 50;

/** Must match installed pdfjs-dist and the file under public/pdfjs/<ver>/. */
export const PDFJS_VERSION = '6.1.200';
export const PDFJS_LEGACY_WORKER_SRC = `/pdfjs/${PDFJS_VERSION}/pdf.worker.min.mjs`;

type PdfjsLegacy = typeof import('pdfjs-dist/legacy/build/pdf.mjs');

let pdfjsLegacyPromise: Promise<PdfjsLegacy> | null = null;

function loadPdfjsLegacy(): Promise<PdfjsLegacy> {
  if (!pdfjsLegacyPromise) {
    pdfjsLegacyPromise = import('pdfjs-dist/legacy/build/pdf.mjs').then((pdfjs) => {
      pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_LEGACY_WORKER_SRC;
      return pdfjs;
    });
  }
  return pdfjsLegacyPromise;
}

export async function extractTextFromPdf(file: File): Promise<string> {
  if (file.size > MAX_PDF_BYTES) {
    throw new Error('PDF is larger than 8 MB. Split the file or upload a smaller PDF.');
  }

  const pdfjs = await loadPdfjsLegacy();
  const data = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data }).promise;

  if (pdf.numPages > MAX_PDF_PAGES) {
    throw new Error(
      `PDF has ${pdf.numPages} pages. This tool accepts up to ${MAX_PDF_PAGES} pages.`
    );
  }

  const chunks: string[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    let lastY = -1;
    let pageText = '';

    for (const item of content.items) {
      if (!('str' in item) || !('transform' in item)) continue;
      const y = item.transform[5];
      if (lastY !== -1 && Math.abs(y - lastY) > 5) pageText += '\n';
      pageText += item.str;
      lastY = y;
    }
    chunks.push(pageText);
  }

  const text = chunks.join('\n\n').trim();
  if (!text) {
    throw new Error(
      'No selectable text found in this PDF. Scanned or image-only PDFs need OCR before conversion.'
    );
  }
  return text;
}

export async function downloadTextAsPdf(
  text: string,
  mode: 'krutidev' | 'unicode'
): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;
  const tempDiv = document.createElement('div');
  // textContent retains newlines without requiring the source to be rendered.
  tempDiv.textContent = text;
  tempDiv.style.whiteSpace = 'pre-wrap';
  tempDiv.style.wordWrap = 'break-word';
  tempDiv.style.fontFamily =
    mode === 'krutidev'
      ? "'KrutiDev010', monospace"
      : "'Noto Sans Devanagari', sans-serif";
  tempDiv.style.fontSize = mode === 'krutidev' ? '18pt' : '14pt';
  tempDiv.style.lineHeight = '1.6';
  tempDiv.style.padding = '20px 40px';
  tempDiv.style.color = '#000';
  tempDiv.style.background = '#fff';
  // html2pdf clones this source into its own page-width container before capture.
  // Do not position the source thousands of pixels offscreen: that inline style
  // survives cloning and can make html2canvas capture a blank page.
  // A detached element also avoids flashing the content into the real page.
  tempDiv.style.boxSizing = 'border-box';
  tempDiv.style.width = '100%';

  await html2pdf()
    .set({
        margin: 15,
        filename: `converted_${mode}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: window.innerWidth <= 768 ? 1 : 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
    .from(tempDiv)
    .save();
}
