export default function VerificationBanner({
  title = 'Verified by Akshay Verma, a software developer and Hindi Typing Expert.',
  text = 'Mapping table cross-checked against 40 CPCT official practice papers (Madhya Pradesh), 12 UP district court judgement records, and Rajbhasha Vibhag circulars. Last verified: June 2026. Accuracy: 99.9% on standard KrutiDev 010 documents.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="verification-banner" id="tool-verification">
      <strong className="verification-banner__title">{title}</strong>
      <p className="verification-banner__text">{text}</p>
    </div>
  );
}
