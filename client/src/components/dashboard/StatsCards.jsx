import "./StatsCards.css";
import StatCard from "./StatCard";

export default function StatsCards({ stats }) {
  if (!stats) return null;
  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <section className="stats-grid">
      <StatCard label="Total applications" value={total} color="#3b82f6" />
      <StatCard label="Interviews" value={stats.interview} color="#a16207" />
      <StatCard label="Offers" value={stats.offer} color="#15803d" />
      <StatCard label="Rejected" value={stats.rejected} color="#b91c1c" />
    </section>
  );
}