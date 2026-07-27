import Link from 'next/link';

/** AEO expert quote — unique copy per page; cite links to /about-us. */
export default function ExpertQuote({
  quote,
  className = 'u2k10-quote glass-card glass-card--lg',
}: {
  quote: string;
  className?: string;
}) {
  return (
    <blockquote className={className}>
      <p>&ldquo;{quote}&rdquo;</p>
      <cite>
        Akshay Verma —{' '}
        <Link href="/about-us">Software Developer and Hindi Typing Expert</Link>
      </cite>
    </blockquote>
  );
}
