import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import PageContainer from "../components/layout/PageContainer";
import JobForm from "../components/jobs/JobForm";
import { jobsService } from "../services/jobsService";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await jobsService.getOne(id);
        setJob(data);
      } catch {
        setError("Job not found");
      } finally {
        setFetching(false);
      }
    })();
  }, [id]);

  const handleSubmit = async (form) => {
    try {
      setLoading(true);
      await jobsService.update(id, form);
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p style={{ padding: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

  return (
    <>
      <Sidebar />
      <PageContainer withSidebar>
        <section className="section-head">
          <div>
            <h1 className="title">Edit job</h1>
            <p className="subtitle">Update your application details.</p>
          </div>
        </section>
        <div className="card" style={{ padding: "1.5rem" }}>
          <JobForm initial={job} onSubmit={handleSubmit} loading={loading} />
        </div>
      </PageContainer>
    </>
  );
}