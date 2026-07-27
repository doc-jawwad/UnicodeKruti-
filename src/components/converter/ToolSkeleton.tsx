/** SSR-safe / dynamic-import loading shell — reserves height to avoid CLS. */
export default function ToolSkeleton({
  minHeight = 420,
  label = 'Loading converter…',
}: {
  minHeight?: number;
  label?: string;
}) {
  return (
    <div
      className="tool-skeleton"
      role="status"
      aria-busy="true"
      aria-label={label}
      style={{ minHeight }}
    >
      <span className="tool-skeleton__pulse" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
