import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { jobsService } from "../services/jobsService";

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await jobsService.getStats();
      console.log("Updated stats:", data.totals);
      setStats(data.totals);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <StatsContext.Provider value={{ stats, loading, fetchStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within StatsProvider");
  }
  return context;
}
