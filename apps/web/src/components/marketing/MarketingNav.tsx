import { Link, NavLink } from 'react-router-dom';
import { Wordmark } from '../Wordmark';
import { theme } from '../../theme';

const links = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/status', label: 'Status' },
  { to: '/support', label: 'Support' },
];

export function MarketingNav() {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem 2.5rem',
        borderBottom: `1px solid ${theme.border}`,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <Link to="/">
        <Wordmark />
      </Link>
      <div style={{ display: 'flex', gap: 30 }} className="mk-links">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            style={({ isActive }) => ({
              fontSize: 13,
              color: isActive ? '#fff' : theme.textMuted,
              transition: 'color .15s',
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link to="/login" style={{ fontSize: 13, color: theme.textMuted }}>
          Sign In
        </Link>
        <Link
          to="/register"
          style={{
            padding: '7px 18px',
            borderRadius: 8,
            background: '#fff',
            color: theme.bg,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Get Started
        </Link>
      </div>
      <style>{`@media (max-width: 720px) { .mk-links { display: none !important; } }`}</style>
    </nav>
  );
}
