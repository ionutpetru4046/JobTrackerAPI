import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import api from "../services/api";

// Helper: Only send token for authenticated routes.
// Requests to login/register must NOT send token.
const shouldSendAuthHeader = (url = "") => {
  // Accept both relative "/auth/register" and "/localhost:5000/auth/register"
  const registerPattern = /\/auth\/register$/;
  return !url.endsWith("/auth/login") && !registerPattern.test(url);
};

if (!api.__AUTH_CONTEXT_INTERCEPTOR_ATTACHED) {
  api.interceptors.request.use(
    (config) => {
      // Only set auth header on secure routes
      if (shouldSendAuthHeader(config.url)) {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          delete config.headers.Authorization;
        }
      } else {
        // Remove for login and register
        delete config.headers.Authorization;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
  api.__AUTH_CONTEXT_INTERCEPTOR_ATTACHED = true;
}

const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize login/register/logout for consistency
  const login = useCallback(async (email, password) => {
    try {
      console.log("Attempting login with:", { email, password });
      const { data } = await api.post("/auth/login", { email, password });
      console.log("Login response:", data);
      if (!data?.token) throw new Error("No token returned from backend");
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      throw err;
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      console.log("Attempting register with:", { name, email, password });
      // Use a consistent register endpoint (without host)
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log("Register response:", data);
      if (!data?.token) throw new Error("No token returned from backend");
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      if (err.response) {
        const res = err.response;
        const msg =
          res.data?.error ||
          res.data?.message ||
          res.data ||
          err.message ||
          "Unknown error";
        console.error("Register failed:", res.status, msg);
      } else {
        console.error("Register failed:", err.message);
      }
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  // On mount: check current token and try fetch user
  useEffect(() => {
    let mounted = true;
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/auth/me");
        if (mounted) setUser(data);
      } catch (err) {
        localStorage.removeItem("token");
        if (mounted) setUser(null);
        if (err.response) {
          const res = err.response;
          const msg =
            res.data?.error ||
            res.data?.message ||
            res.data ||
            err.message ||
            "Unknown error";
          console.error("/auth/me failed:", res.status, msg);
        } else {
          console.error("/auth/me failed:", err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
