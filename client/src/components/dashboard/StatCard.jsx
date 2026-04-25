export default function StatCard({ label, value, color = "#3b82f6" }) {
    return (
      <article className="card stat-card">
        <div className="stat-label">{label}</div>
        <div className="stat-value" style={{ color }}>{value ?? 0}</div>
      </article>
    );
  }