import { Shell } from '../layouts/Shell';
import { PageHeader } from '../components/PageHeader';
import { Link } from 'react-router-dom';

export function VerifyDiscordPage() {
  return (
    <Shell>
      <div style={{ maxWidth: 480, margin: '4rem auto', padding: '0 1.5rem' }}>
        <PageHeader
          title="Verify Discord account"
          subtitle="Use the /verify command in your Discord server or connect via OAuth."
        />
        <div
          style={{
            padding: '1.5rem',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 1rem' }}>
            Run <code>/verify</code> in your linked Discord server to complete verification.
          </p>
          <Link
            to="/select-plan"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              borderRadius: 10,
              background: 'linear-gradient(135deg,#c084fc,#818cf8)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Continue to plan selection
          </Link>
        </div>
      </div>
    </Shell>
  );
}
