import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-wrap">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page not found</h1>
      <p className="notfound-desc">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
        <Link to="/dashboard" className="btn btn-ghost">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}