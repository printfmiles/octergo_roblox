import { Link } from 'react-router-dom';
import { Wordmark } from '../Wordmark';
import { theme } from '../../theme';

const columns = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Status', to: '/status' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Support', to: '/support' },
      { label: 'Docs', to: '/support' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Terms of Service', to: '/support' },
      { label: 'Privacy Policy', to: '/support' },
    ],
  },
];

export function Footer() {
  return (
    <div style={{ padding: '0 2rem 2.5rem', position: 'relative', zIndex: 1 }}>
      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${theme.border}`,
          borderRadius: 18,
          padding: '2rem 2.5rem',
          display: 'flex',
          gap: '3rem',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: '0 0 220px' }}>
          <div style={{ marginBottom: 10 }}>
            <Wordmark size={26} />
          </div>
          <p style={{ fontSize: 13, color: theme.textFaint, lineHeight: 1.6, margin: 0 }}>
            Managing Roblox communities with precision and modern reliability.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title} style={{ flex: '0 0 140px' }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: theme.textDim,
                letterSpacing: '0.1em',
                marginBottom: 14,
              }}
            >
              {col.title}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((l) => (
                <Link key={l.label} to={l.to} style={{ fontSize: 13, color: theme.textMuted }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div style={{ flex: 1, minWidth: 180 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: theme.textDim,
              letterSpacing: '0.1em',
              marginBottom: 14,
            }}
          >
            COMMUNITY
          </div>
          <a
            href="https://discord.gg/rQMuccG84H"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 24,
              background: theme.gradientSoft,
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Join our Discord
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1100,
          margin: '16px auto 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 0.5rem',
        }}
      >
        <span style={{ fontSize: 12, color: theme.textDim }}>© 2026 Octergo. All rights reserved.</span>
        <span style={{ fontSize: 12, color: theme.textDim }}>
          Powered by <span style={{ color: theme.textMuted }}>Octergo</span>
        </span>
      </div>
    </div>
  );
}
