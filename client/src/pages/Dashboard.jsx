import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import PageContainer from "../components/layout/PageContainer";
import StatsCards from "../components/dashboard/StatsCards";
import RecentJobs from "../components/dashboard/RecentJobs";
import { useAuth } from "../context/AuthContext";
import { useStats } from "../context/StatsContext";
import { useJobs } from "../hooks/useJobs";

export default function Dashboard() {
  const { user } = useAuth();
  const { stats, fetchStats } = useStats();
  const { jobs, refetch: refetchJobs } = useJobs({ sort: "-createdAt", limit: 5 });
  const location = useLocation();

  // Refetch stats and jobs when dashboard loads
  useEffect(() => {
    fetchStats();
    refetchJobs();
  }, [fetchStats, refetchJobs]);

  return (
    <>
      <Sidebar />
      <PageContainer withSidebar>
        <section className="section-head">
          <div>
            <h1 className="title">Dashboard</h1>
            <p className="subtitle">
              Welcome back{user?.name ? `, ${user.name}` : ""}. Here is your job search overview.
            </p>
          </div>
          <Link className="btn btn-primary" to="/jobs/new">Add job</Link>
        </section>

        <StatsCards stats={stats} />

        <section className="card list-card" style={{ marginTop: "1.5rem" }}>
          <h2 className="title" style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Recent activity</h2>
          <RecentJobs jobs={jobs} />
        </section>
      </PageContainer>
    </>
  );
}