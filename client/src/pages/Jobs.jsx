import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import PageContainer from "../components/layout/PageContainer";
import JobFilters from "../components/jobs/JobFilters";
import JobsTable from "../components/jobs/JobsTable";
import { useJobs } from "../hooks/useJobs";

export default function Jobs() {
  const [filters, setFilters] = useState({ sort: "-createdAt", page: 1, limit: 10 });
  const { jobs, pagination, loading, error, refetch } = useJobs(filters);

  return (
    <>
      <Sidebar />
      <PageContainer withSidebar>
        <section className="section-head">
          <div>
            <h1 className="title">Jobs</h1>
            <p className="subtitle">Track all applications and keep your pipeline moving.</p>
          </div>
          <Link className="btn btn-primary" to="/jobs/new">Add job</Link>
        </section>

        <JobFilters filters={filters} onChange={setFilters} />

        <section className="card list-card">
          <JobsTable jobs={jobs} loading={loading} error={error} onDeleted={refetch} />
        </section>

        {pagination && pagination.pages > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`btn ${filters.page === p ? "btn-primary" : "btn-ghost"}`}
                onClick={() => setFilters((f) => ({ ...f, page: p }))}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </PageContainer>
    </>
  );
}