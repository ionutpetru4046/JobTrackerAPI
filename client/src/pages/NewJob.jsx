import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import PageContainer from "../components/layout/PageContainer";
import JobForm from "../components/jobs/JobForm";
import { jobsService } from "../services/jobsService";
import { useStats } from "../context/StatsContext";

export default function NewJob() {
    const navigate = useNavigate();
    const { fetchStats } = useStats();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleSubmit = async (form) => {
      try {
        setLoading(true);
        console.log("Creating job...");
        await jobsService.create(form);
        console.log("Job created, fetching stats...");
        await fetchStats();
        console.log("Stats fetched!");
        navigate("/jobs");
      } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.error || "Failed to create job");
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <Sidebar />
      <PageContainer withSidebar>
        <section className="section-head">
          <div>
            <h1 className="title">Add job</h1>
            <p className="subtitle">Log a new job application.</p>
          </div>
        </section>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="card" style={{ padding: "1.5rem" }}>
          <JobForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </PageContainer>
    </>
  );
}