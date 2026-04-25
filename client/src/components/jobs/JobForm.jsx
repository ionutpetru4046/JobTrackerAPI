import "./JobForm.css";
import { useState } from "react";
import { JOB_STATUSES } from "../../utils/constants";

const empty = {
  company: "",
  role: "",
  status: "applied",
  dateApplied: "",
  salary: "",
  jobUrl: "",
  notes: "",
};

export default function JobForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({ ...empty, ...initial });
  const [error, setError] = useState(null);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.company || !form.role) {
      setError("Company and role are required");
      return;
    }
    setError(null);
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label className="label">Company *</label>
          <input className="input" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="e.g. Acme Inc" />
        </div>
        <div>
          <label className="label">Role *</label>
          <input className="input" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Frontend Engineer" />
        </div>
        <div>
          <label className="label">Status</label>
          <select className="input" value={form.status} onChange={(e) => set("status", e.target.value)}>
            {JOB_STATUSES.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Date Applied</label>
          <input className="input" type="date" value={form.dateApplied} onChange={(e) => set("dateApplied", e.target.value)} />
        </div>
        <div>
          <label className="label">Salary</label>
          <input className="input" value={form.salary} onChange={(e) => set("salary", e.target.value)} placeholder="e.g. €60,000" />
        </div>
        <div>
          <label className="label">Job URL</label>
          <input className="input" type="url" value={form.jobUrl} onChange={(e) => set("jobUrl", e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className="label">Notes</label>
        <textarea className="input" rows={4} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Any notes about this application..." />
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save job"}
      </button>
    </form>
  );
}