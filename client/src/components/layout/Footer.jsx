import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-icon">J</span>
            JobTracker
          </div>
          <p className="footer-tagline">
            A clean, focused job application tracker for your job search.
          </p>
        </div>

        <div className="footer-links-group">
          <div className="footer-col">
            <h4 className="footer-col-title">Product</h4>
            <Link to="/register" className="footer-link">Get started</Link>
            <Link to="/login" className="footer-link">Sign in</Link>
            <Link to="/dashboard" className="footer-link">Dashboard</Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Track</h4>
            <Link to="/jobs" className="footer-link">All jobs</Link>
            <Link to="/jobs/new" className="footer-link">Add a job</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} JobTracker. All rights reserved.</span>
      </div>
    </footer>
  );
}