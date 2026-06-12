import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@octergo/shared';
import type { RobloxVerificationStartResponse } from '@octergo/shared';
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
  const [pending, setPending] = useState<RobloxVerificationStartResponse | null>(null);

  async function handleStart(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Enter your Roblox username.');
      return;
    }

    setLoading(true);
    try {
      const result = await api.post<RobloxVerificationStartResponse>(
        API_ROUTES.VERIFICATION.ROBLOX_START,
        { robloxUsername: username.trim() },
      );
      setPending(result);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleCheck() {
    if (!pending) return;

    setError('');
    setLoading(true);
    try {
      await api.post(API_ROUTES.VERIFICATION.ROBLOX_CHECK, {
        verificationId: pending.verificationId,
      });
      navigate('/verify/discord');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  function handleStartOver() {
    setPending(null);
    setError('');
  }

  return (
    <AuthShell>
      <h2 className="auth-title">Verify Roblox account</h2>
      <p className="auth-subtitle">Step 2 of 3 — Link your Roblox profile</p>
      <Steps current={2} />

      {!pending ? (
        <form onSubmit={handleStart}>
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
              <li>Add a verification code to your Roblox bio</li>
              <li>Click verify to confirm ownership</li>
            </ol>
          </div>

          <ErrMsg message={error} />
          <GradBtn type="submit" disabled={loading}>
            {loading ? 'Looking up…' : 'Continue →'}
          </GradBtn>
        </form>
      ) : (
        <div className="verify-code-step">
          <p className="verify-code-step__label">
            Add this code to your Roblox bio for <strong>{pending.robloxUsername}</strong>:
          </p>
          <div className="verify-code-box">
            <code>{pending.code}</code>
          </div>
          <p className="verify-code-step__hint">
            Open your Roblox profile, paste the code into your bio, save, then click Verify below.
          </p>

          <ErrMsg message={error} />
          <GradBtn type="button" onClick={handleCheck} disabled={loading}>
            {loading ? 'Checking bio…' : 'Verify'}
          </GradBtn>
          <button type="button" className="verify-start-over" onClick={handleStartOver}>
            Use a different username
          </button>
        </div>
      )}

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
        .verify-code-step__label {
          font-size: 14px;
          color: #cbd5e1;
          margin: 0 0 12px;
          line-height: 1.5;
        }
        .verify-code-step__label strong {
          color: #fff;
        }
        .verify-code-box {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(167, 139, 250, 0.35);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-bottom: 12px;
          text-align: center;
        }
        .verify-code-box code {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #c4b5fd;
        }
        .verify-code-step__hint {
          font-size: 13px;
          color: #94a3b8;
          margin: 0 0 16px;
          line-height: 1.5;
        }
        .verify-start-over {
          display: block;
          width: 100%;
          margin-top: 10px;
          padding: 0.5rem;
          background: none;
          border: none;
          color: #64748b;
          font-size: 13px;
          cursor: pointer;
        }
        .verify-start-over:hover {
          color: #94a3b8;
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
