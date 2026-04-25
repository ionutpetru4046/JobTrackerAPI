import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="top-nav">
      <div className="top-nav-inner">
        <Link to={user ? "/dashboard" : "/"} className="brand">
          <span className="brand-icon">J</span>
          JobTracker
        </Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "nav-link-active" : ""}`}>
                Dashboard
              </Link>
              <Link to="/jobs" className={`nav-link ${location.pathname.startsWith("/jobs") ? "nav-link-active" : ""}`}>
                Jobs
              </Link>
              <div className="nav-divider" />
              <div className="nav-avatar" title={user.email}>
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm" type="button">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}