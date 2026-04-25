import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import DeleteJobButton from "./DeleteJobButton";
import { formatDate } from "../../utils/formatDate";

export default function JobCard({ job, onDeleted }) {
  return (
    <li className="list-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <div>
          <strong>{job.role}</strong> at {job.company}
          {job.salary && <span style={{ marginLeft: "0.5rem", color: "#6b7280", fontSize: "0.875rem" }}>· {job.salary}</span>}
        </div>
        <StatusBadge status={job.status} />
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", width: "100%", fontSize: "0.875rem", color: "#6b7280" }}>
        {job.dateApplied && <span>Applied {formatDate(job.dateApplied)}</span>}
        {job.jobUrl && <a href={job.jobUrl} target="_blank" rel="noreferrer">View posting</a>}
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
          <Link className="btn btn-ghost" to={`/jobs/${job._id}/edit`}>Edit</Link>
          <DeleteJobButton jobId={job._id} onDeleted={onDeleted} />
        </div>
      </div>
      {job.notes && <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>{job.notes}</p>}
    </li>
  );
}