'use client';

export const MAX_PDF_BYTES = 8 * 1024 * 1024;
export const MAX_PDF_PAGES = 50;

export async function extractTextFromPdf(file: File): Promise<string> {
  if (file.size > MAX_PDF_BYTES) {
    throw new Error('PDF is larger than 8 MB. Split the file or upload a smaller PDF.');
  }

  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

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

  return chunks.join('\n\n').trim();
}

export async function downloadTextAsPdf(
  text: string,
  mode: 'krutidev' | 'unicode'
): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;
  const tempDiv = document.createElement('div');
  tempDiv.innerText = text;
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
  tempDiv.style.width = '210mm';
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  document.body.appendChild(tempDiv);

  try {
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
  } finally {
    tempDiv.remove();
  }
}
