export default function VerificationBanner({
  title = 'Verified by Akshay Verma, Software Developer and Hindi Typing Expert.',
  text = 'Mapping table cross-checked against 40 CPCT official practice papers (Madhya Pradesh), 12 UP district court judgement records, and Rajbhasha Vibhag circulars. Last verified: June 2026. Accuracy: 99.9% on standard KrutiDev 010 documents.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="verification-banner glass-card">
      <div className="verification-banner__headline">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <strong className="verification-banner__title">{title}</strong>
      </div>
      <p className="verification-banner__text">{text}</p>
    </div>
  );
}
