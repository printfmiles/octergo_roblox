import { Link } from 'react-router-dom';
import { Shell } from '../layouts/Shell';
import { Wordmark } from '../components/Wordmark';

export function LandingPage() {
  return (
    <Shell>
      <nav style={navStyle}>
        <Link to="/"><Wordmark /></Link>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" style={ghostBtn}>Sign in</Link>
          <Link to="/register" style={primaryBtn}>Get started</Link>
        </div>
      </nav>
      <section style={heroStyle}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
          Manage Roblox communities
          <br />
          <span style={{ color: '#a78bfa' }}>with precision</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 520, marginTop: 20 }}>
          Sync ranks, moderate members, and coordinate sessions — all from one dashboard
          with Discord integration.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <Link to="/register" style={primaryBtn}>Start free trial</Link>
          <Link to="/login" style={ghostBtn}>Sign in</Link>
        </div>
      </section>
    </Shell>
  );
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.1rem 2.5rem',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
};

const heroStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: '0 auto',
  padding: '6rem 2rem',
  textAlign: 'center',
};

const primaryBtn: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: 10,
  background: 'linear-gradient(135deg,#c084fc,#818cf8)',
  color: '#fff',
  fontWeight: 700,
  fontSize: 14,
};

const ghostBtn: React.CSSProperties = {
  padding: '10px 20px',
  borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.12)',
  color: '#e2e8f0',
  fontWeight: 600,
  fontSize: 14,
};
