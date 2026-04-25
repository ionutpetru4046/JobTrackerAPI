import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h1 className="title">Welcome back</h1>
        <p className="subtitle">Login to continue tracking your applications.</p>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="email" className="label">
              Email
            </label>
          <input
            id="email"
            type="email"
            value={email}
            className="input"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>

          <div className="field">
            <label htmlFor="password" className="label">
              Password
            </label>
          <input
            id="password"
            type="password"
            value={password}
            className="input"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footnote">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}