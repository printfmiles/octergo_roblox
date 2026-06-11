import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@octergo/shared';
import { AuthShell } from '../components/auth/AuthShell';
import { ErrMsg } from '../components/auth/ErrMsg';
import { Field } from '../components/auth/Field';
import { GradBtn } from '../components/auth/GradBtn';
import { Steps } from '../components/auth/Steps';
import { ApiError, api } from '../lib/api';

function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.statusCode === 0) {
      return 'Cannot reach the API. Make sure the backend is running on http://localhost:3000';
    }
    return err.message;
  }
  return 'Verification failed. Please try again.';
}

export function VerifyRobloxPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Enter your Roblox username.');
      return;
    }

    setLoading(true);
    try {
      await api.post(API_ROUTES.VERIFICATION.ROBLOX, { robloxUsername: username.trim() });
      navigate('/verify/discord');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <h2 className="auth-title">Verify Roblox account</h2>
      <p className="auth-subtitle">Step 2 of 3 — Link your Roblox profile</p>
      <Steps current={2} />

      <form onSubmit={handleSubmit}>
        <Field
          label="Roblox username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your exact Roblox username"
          autoComplete="username"
        />

        <div className="verify-hint">
          <p className="verify-hint__title">How it works</p>
          <ol className="verify-hint__list">
            <li>Enter the username shown on your Roblox profile</li>
            <li>We link it to your Octergo account</li>
            <li>Next, verify Discord to finish setup</li>
          </ol>
        </div>

        <ErrMsg message={error} />
        <GradBtn type="submit" disabled={loading}>
          {loading ? 'Verifying…' : 'Continue →'}
        </GradBtn>
      </form>

      <p className="auth-footer auth-footer--muted">
        <Link to="/register">← Back to registration</Link>
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
        .verify-hint {
          background: rgba(167, 139, 250, 0.07);
          border: 1px solid rgba(167, 139, 250, 0.2);
          border-radius: 12px;
          padding: 1rem 1.1rem;
          margin-bottom: 14px;
        }
        .verify-hint__title {
          font-size: 12px;
          font-weight: 700;
          color: #a78bfa;
          margin: 0 0 10px;
          letter-spacing: 0.04em;
        }
        .verify-hint__list {
          margin: 0;
          padding-left: 1.1rem;
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.6;
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
