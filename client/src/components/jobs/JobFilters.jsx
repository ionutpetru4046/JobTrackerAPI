import { JOB_STATUSES, SORT_OPTIONS } from "../../utils/constants";

export default function JobFilters({ filters, onChange }) {
  const set = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
      <input
        className="input"
        type="text"
        placeholder="Search company or role..."
        value={filters.search || ""}
        onChange={(e) => set("search", e.target.value)}
        style={{ flex: 1, minWidth: "200px" }}
      />
      <select
        className="input"
        value={filters.status || ""}
        onChange={(e) => set("status", e.target.value)}
      >
        <option value="">All statuses</option>
        {JOB_STATUSES.map((s) => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
      <select
        className="input"
        value={filters.sort || "-createdAt"}
        onChange={(e) => set("sort", e.target.value)}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}