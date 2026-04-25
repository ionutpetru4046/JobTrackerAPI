import JobCard from "./JobCard";

export default function JobsTable({ jobs, loading, error, onDeleted }) {
  if (loading) return <p style={{ padding: "1rem" }}>Loading jobs...</p>;
  if (error) return <p style={{ padding: "1rem", color: "red" }}>{error}</p>;
  if (!jobs.length) return <p style={{ padding: "1rem", color: "#6b7280" }}>No jobs found. Add your first application!</p>;

  return (
    <ul className="list">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onDeleted={onDeleted} />
      ))}
    </ul>
  );
}