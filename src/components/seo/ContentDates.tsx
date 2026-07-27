/** Visible content freshness + 90-day update reminder for GEO citation retention. */
export default function ContentDates({
  published,
  modified,
}: {
  /** ISO date YYYY-MM-DD */
  published: string;
  /** ISO date YYYY-MM-DD — bump every ~90 days with at least one content/stat refresh */
  modified: string;
}) {
  const fmt = (iso: string) =>
    new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-IN', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });

  return (
    <p className="content-dates" aria-label="Content publication dates">
      <time dateTime={published}>Published: {fmt(published)}</time>
      <span aria-hidden="true"> · </span>
      <time dateTime={modified}>Last updated: {fmt(modified)}</time>
    </p>
  );
}
