import { Link } from 'react-router-dom';
import { Wordmark } from './Wordmark';

export function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <Wordmark />
      </Link>
      <div className="navbar__actions">
        <Link to="/login" className="navbar__link">
          Sign in
        </Link>
        <Link to="/register" className="navbar__cta">
          Get Started
        </Link>
      </div>
      <style>{`
        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 2.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .navbar__actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .navbar__link {
          color: #94a3b8;
          font-size: 14px;
          font-weight: 500;
        }
        .navbar__link:hover {
          color: #fff;
        }
        .navbar__cta {
          padding: 7px 18px;
          border-radius: 8px;
          background: #fff;
          color: #08080d;
          font-size: 13px;
          font-weight: 700;
        }
      `}</style>
    </nav>
  );
}
