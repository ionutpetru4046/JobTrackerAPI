import { Link } from "react-router-dom";
import StatusBadge from "../jobs/StatusBadge";
import { formatDate } from "../../utils/formatDate";

export default function RecentJobs({ jobs }) {
  if (!jobs?.length) {
    return (
      <ul className="list">
        <li className="list-item">
          <span>No job updates yet. Add your first application.</span>
          <Link className="btn btn-ghost" to="/jobs">Go to Jobs</Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="list">
      {jobs.map((job) => (
        <li className="list-item" key={job._id}>
          <div>
            <strong>{job.role}</strong> at {job.company}
            {job.dateApplied && (
              <span style={{ marginLeft: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                · {formatDate(job.dateApplied)}
              </span>
            )}
          </div>
          <StatusBadge status={job.status} />
        </li>
      ))}
    </ul>
  );
}