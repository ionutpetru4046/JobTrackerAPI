import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h1 className="title">Create your account</h1>
        <p className="subtitle">
          Start organizing your job applications with a clean workflow.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <label htmlFor="name" className="label">
              Name
            </label>
          <input
            id="name"
            type="text"
            value={name}
            className="input"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>

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
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footnote">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}