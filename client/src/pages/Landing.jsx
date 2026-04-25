import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";

const features = [
  {
    icon: "📋",
    title: "Track every application",
    desc: "Log jobs with company, role, salary, status and notes — all in one place.",
  },
  {
    icon: "📊",
    title: "Visual dashboard",
    desc: "See your pipeline at a glance — applied, interviewing, offers and rejections.",
  },
  {
    icon: "🔍",
    title: "Filter & search",
    desc: "Find any application instantly by company, role or status.",
  },
  {
    icon: "✏️",
    title: "Edit anytime",
    desc: "Update status and notes as your applications progress through stages.",
  },
  {
    icon: "🔒",
    title: "Your data only",
    desc: "Each account is private. Only you can see your applications.",
  },
  {
    icon: "⚡",
    title: "Fast & lightweight",
    desc: "No bloat. Just a clean, focused tool that gets out of your way.",
  },
];

const steps = [
  { step: "1", title: "Create an account", desc: "Sign up free in under a minute." },
  { step: "2", title: "Add your applications", desc: "Log every job you apply to with key details." },
  { step: "3", title: "Track your progress", desc: "Update statuses and stay on top of follow-ups." },
];

export default function Landing() {
  return (
    <div className="landing">

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-container">
          <div className="landing-badge">Free job search tracker</div>
          <h1 className="landing-h1">
            Stay organised during<br />your job search
          </h1>
          <p className="landing-lead">
            Stop losing track of applications in spreadsheets. JobTracker keeps your
            entire pipeline organised, searchable and up to date.
          </p>
          <div className="landing-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start tracking for free
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Sign in
            </Link>
          </div>
          <p className="landing-hint">No credit card required · Free forever</p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="landing-strip">
        <div className="landing-container landing-strip-inner">
          <div className="landing-stat">
            <span className="landing-stat-value">100%</span>
            <span className="landing-stat-label">Free to use</span>
          </div>
          <div className="landing-strip-divider" />
          <div className="landing-stat">
            <span className="landing-stat-value">6+</span>
            <span className="landing-stat-label">Fields per application</span>
          </div>
          <div className="landing-strip-divider" />
          <div className="landing-stat">
            <span className="landing-stat-value">4</span>
            <span className="landing-stat-label">Pipeline stages</span>
          </div>
          <div className="landing-strip-divider" />
          <div className="landing-stat">
            <span className="landing-stat-value">∞</span>
            <span className="landing-stat-label">Applications tracked</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section">
        <div className="landing-container">
          <div className="landing-section-head">
            <h2 className="landing-h2">Everything you need, nothing you don't</h2>
            <p className="landing-section-sub">
              A focused set of tools built around the real job search workflow.
            </p>
          </div>
          <div className="landing-features-grid">
            {features.map((f) => (
              <article key={f.title} className="landing-feature-card">
                <span className="landing-feature-icon">{f.icon}</span>
                <h3 className="landing-feature-title">{f.title}</h3>
                <p className="landing-feature-desc">{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="landing-section landing-section-alt">
        <div className="landing-container">
          <div className="landing-section-head">
            <h2 className="landing-h2">Up and running in minutes</h2>
            <p className="landing-section-sub">Three steps and you're tracking.</p>
          </div>
          <div className="landing-steps">
            {steps.map((s) => (
              <div key={s.step} className="landing-step">
                <div className="landing-step-num">{s.step}</div>
                <h3 className="landing-step-title">{s.title}</h3>
                <p className="landing-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta-section">
        <div className="landing-container landing-cta-inner">
          <h2 className="landing-cta-h2">Ready to take control of your job search?</h2>
          <p className="landing-cta-sub">Join and start tracking your applications today.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create your free account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}