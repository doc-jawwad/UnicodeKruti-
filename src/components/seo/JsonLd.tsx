/**
 * Server-rendered JSON-LD. Must appear in the initial HTML (not client-only).
 * Escapes `<` so the payload cannot break out of the script element.
 */
export default function JsonLd({
  data,
  id = 'json-ld',
}: {
  data: Record<string, unknown> | readonly Record<string, unknown>[] | Record<string, unknown>[];
  id?: string;
}) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON-LD is safe as a raw script body; crawlers read it without JS.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
