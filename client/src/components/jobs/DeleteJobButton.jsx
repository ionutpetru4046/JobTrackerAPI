import { useState } from "react";
import { jobsService } from "../../services/jobsService";

export default function DeleteJobButton({ jobId, onDeleted }) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await jobsService.remove(jobId);
      onDeleted();
    } catch {
      alert("Failed to delete job");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <span style={{ display: "flex", gap: "0.5rem" }}>
        <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Confirm"}
        </button>
        <button className="btn btn-ghost" onClick={() => setConfirming(false)}>Cancel</button>
      </span>
    );
  }

  return (
    <button className="btn btn-ghost" onClick={() => setConfirming(true)}>Delete</button>
  );
}