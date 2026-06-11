import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { GradBtn } from '../components/auth/GradBtn';
import { Steps } from '../components/auth/Steps';

export function VerifyDiscordPage() {
  const navigate = useNavigate();

  return (
    <AuthShell>
      <h2 className="auth-title">Verify Discord account</h2>
      <p className="auth-subtitle">Step 3 of 3 — Link your Discord profile</p>
      <Steps current={3} />

      <div className="verify-card">
        <p className="verify-card__text">
          Run <code className="verify-card__code">/verify</code> in your linked Discord server with
          your Roblox username to complete verification.
        </p>
        <GradBtn type="button" onClick={() => navigate('/select-plan')}>
          Continue to plan selection →
        </GradBtn>
      </div>

      <p className="auth-footer auth-footer--muted">
        <Link to="/verify/roblox">← Back to Roblox verification</Link>
      </p>

      <style>{`
        .auth-title {
          font-size: 22px;
          font-weight: 800;
          color: #fff;
          margin: 0 0 4px;
          letter-spacing: -0.5px;
        }
        .auth-subtitle {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 20px;
        }
        .verify-card {
          padding: 1.25rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .verify-card__text {
          color: #94a3b8;
          font-size: 14px;
          margin: 0 0 1rem;
          line-height: 1.6;
        }
        .verify-card__code {
          padding: 2px 6px;
          border-radius: 6px;
          background: rgba(167, 139, 250, 0.15);
          color: #c084fc;
          font-size: 13px;
        }
        .auth-footer {
          text-align: center;
          margin-top: 14px;
          font-size: 13px;
        }
        .auth-footer--muted a {
          color: #475569;
        }
        .auth-footer--muted a:hover {
          color: #94a3b8;
        }
      `}</style>
    </AuthShell>
  );
}
