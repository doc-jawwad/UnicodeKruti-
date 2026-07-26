export default function StatsBar({
  items = [
    { value: 'Live', label: 'Real-Time Conversion' },
    { value: '99.9%', label: 'Accuracy Rate' },
    { value: '6', label: 'Browsers Supported' },
  ],
}: {
  items?: { value: string; label: string }[];
}) {
  return (
    <div className="stats-bar">
      {items.map((item) => (
        <div className="stat-item" key={item.label}>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
