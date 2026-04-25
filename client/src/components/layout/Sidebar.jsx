import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Workspace</h2>

      <nav className="sidebar-nav">
        {user && (
          <>
            <Link
              to="/dashboard"
              className={`sidebar-link ${
                location.pathname === "/dashboard" ? "sidebar-link-active" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/jobs"
              className={`sidebar-link ${
                location.pathname.startsWith("/jobs")
                  ? "sidebar-link-active"
                  : ""
              }`}
            >
              Jobs
            </Link>
          </>
        )}
        {!user && (
          <>
            <Link
              to="/login"
              className={`sidebar-link ${
                location.pathname === "/login" ? "sidebar-link-active" : ""
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`sidebar-link ${
                location.pathname === "/register" ? "sidebar-link-active" : ""
              }`}
            >
              Register
            </Link>
          </>
        )}
      </nav>

      {user && (
        <div className="sidebar-footer">
          <div className="nav-user">{user.name || user.email}</div>
          <div style={{ marginTop: 10 }}>
            <button onClick={logout} className="btn btn-ghost" type="button">
              Logout
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;