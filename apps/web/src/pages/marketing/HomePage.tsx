import { Link } from 'react-router-dom';
import { PricingCards } from '../../components/marketing/PricingCards';
import { theme } from '../../theme';

const features = [
  { icon: '▲', label: 'Promote & Demote', desc: 'Rank members instantly with full audit trails' },
  { icon: '⚠', label: 'Warning System', desc: 'Issue warnings that sync across your team' },
  { icon: '🚫', label: 'Terminations', desc: 'Remove members safely with logged evidence' },
  { icon: '🔗', label: 'Discord Logging', desc: 'Every action posted to your server in real-time' },
];

export function HomePage() {
  return (
    <>
      <div style={{ textAlign: 'center', padding: '7rem 2rem 4rem', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'inline-block',
            fontSize: 11,
            fontWeight: 600,
            color: theme.accent,
            background: theme.accentSoft,
            border: `1px solid rgba(167,139,250,0.2)`,
            borderRadius: 20,
            padding: '4px 14px',
            marginBottom: 28,
            letterSpacing: '0.06em',
          }}
        >
          ROBLOX GROUP MANAGEMENT
        </div>
        <h1
          style={{
            fontSize: 'clamp(36px,6vw,64px)',
            fontWeight: 900,
            lineHeight: 1.08,
            margin: '0 auto 20px',
            maxWidth: 720,
            letterSpacing: '-2.5px',
          }}
        >
          <span style={{ color: '#fff' }}>Serving a growing<br />ecosystem of </span>
          <span
            style={{
              background: 'linear-gradient(135deg,#c084fc 0%,#818cf8 60%,#a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            communities.
          </span>
        </h1>
        <p style={{ fontSize: 15, color: theme.textFaint, margin: '0 auto 36px', maxWidth: 480, lineHeight: 1.7 }}>
          Manage your Roblox community with precision and Discord integration. Promote, demote, warn
          and terminate — all from one dashboard.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/register"
            style={{
              padding: '11px 28px',
              borderRadius: 10,
              background: '#fff',
              color: theme.bg,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Get Started →
          </Link>
          <Link
            to="/features"
            style={{
              padding: '11px 28px',
              borderRadius: 10,
              border: `1px solid ${theme.borderStrong}`,
              color: theme.textMuted,
              fontSize: 14,
            }}
          >
            Explore features
          </Link>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          padding: '0 2rem 5rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {features.map((f) => (
          <div
            key={f.label}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              padding: '1rem 1.25rem',
              maxWidth: 200,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 4 }}>{f.label}</div>
            <div style={{ fontSize: 12, color: theme.textDim, lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 2rem 6rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: theme.accent, letterSpacing: '0.1em', marginBottom: 10 }}>
          PRICING
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 36px', letterSpacing: '-1px' }}>
          Simple, transparent pricing
        </h2>
        <PricingCards />
      </div>
    </>
  );
}
