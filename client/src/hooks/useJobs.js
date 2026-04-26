import { useState, useEffect, useCallback } from "react";
import { jobsService } from "../services/jobsService";

export function useJobs(filters = {}) {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await jobsService.getAll(filters);
      setJobs(data.items);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return { jobs, pagination, loading, error, refetch: fetchJobs };
}

export function useStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await jobsService.getStats();
        setStats(data.totals);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { stats, loading, error };
}
