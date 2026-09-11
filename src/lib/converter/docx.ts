/**
 * Minimal browser-only .docx (OOXML) download — no server upload.
 * Uses store+deflate via CompressionStream when available.
 */

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function crc32(buf: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function u16(n: number): Uint8Array {
  const b = new Uint8Array(2);
  new DataView(b.buffer).setUint16(0, n, true);
  return b;
}

function u32(n: number): Uint8Array {
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n, true);
  return b;
}

function concat(parts: Uint8Array[]): Uint8Array {
  const len = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(len);
  let off = 0;
  for (const p of parts) {
    out.set(p, off);
    off += p.length;
  }
  return out;
}

async function deflateRaw(data: Uint8Array): Promise<Uint8Array> {
  if (typeof CompressionStream === 'undefined') return data;
  const copy = new Uint8Array(data);
  const stream = new Blob([copy]).stream().pipeThrough(
    new CompressionStream('deflate-raw')
  );
  const ab = await new Response(stream).arrayBuffer();
  return new Uint8Array(ab);
}

type ZipEntry = {
  name: string;
  data: Uint8Array;
  compressed: Uint8Array;
  method: number;
  crc: number;
};

async function buildZip(files: { name: string; content: string }[]): Promise<Blob> {
  const enc = new TextEncoder();
  const entries: ZipEntry[] = [];

  for (const f of files) {
    const data = enc.encode(f.content);
    const compressed = await deflateRaw(data);
    const useDeflate = compressed.length < data.length;
    entries.push({
      name: f.name,
      data,
      compressed: useDeflate ? compressed : data,
      method: useDeflate ? 8 : 0,
      crc: crc32(data),
    });
  }

  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  for (const e of entries) {
    const nameBytes = enc.encode(e.name);
    const local = concat([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(e.method),
      u16(0),
      u16(0),
      u32(e.crc),
      u32(e.compressed.length),
      u32(e.data.length),
      u16(nameBytes.length),
      u16(0),
      nameBytes,
      e.compressed,
    ]);
    localParts.push(local);

    const central = concat([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0),
      u16(e.method),
      u16(0),
      u16(0),
      u32(e.crc),
      u32(e.compressed.length),
      u32(e.data.length),
      u16(nameBytes.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      nameBytes,
    ]);
    centralParts.push(central);
    offset += local.length;
  }

  const centralDir = concat(centralParts);
  const end = concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(entries.length),
    u16(entries.length),
    u32(centralDir.length),
    u32(offset),
    u16(0),
  ]);

  return new Blob([concat([...localParts, centralDir, end]) as BlobPart], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
}

function paragraphsXml(text: string, font: string): string {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  return lines
    .map((line) => {
      const t = escapeXml(line);
      return `<w:p><w:r><w:rPr><w:rFonts w:ascii="${escapeXml(font)}" w:hAnsi="${escapeXml(font)}" w:cs="${escapeXml(font)}"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr><w:t xml:space="preserve">${t}</w:t></w:r></w:p>`;
    })
    .join('');
}

export type DocxFontMode = 'krutidev' | 'unicode';

export function docxFontForMode(mode: DocxFontMode): string {
  return mode === 'krutidev' ? 'Kruti Dev 010' : 'Mangal';
}

/**
 * Build and trigger download of a .docx with the given run font.
 */
export async function downloadTextAsDocx(
  text: string,
  options: {
    fontMode: DocxFontMode;
    filename?: string;
  }
): Promise<void> {
  const font = docxFontForMode(options.fontMode);
  const filename = options.filename ?? 'unicodekruti-conversion.docx';

  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraphsXml(text, font)}
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>
  </w:body>
</w:document>`;

  const blob = await buildZip([
    { name: '[Content_Types].xml', content: contentTypes },
    { name: '_rels/.rels', content: rels },
    { name: 'word/document.xml', content: documentXml },
  ]);

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
