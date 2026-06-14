import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@octergo/shared';
import type {
  DiscordVerificationStartResponse,
  DiscordVerificationStatus,
} from '@octergo/shared';
import { AuthShell } from '../components/auth/AuthShell';
import { ErrMsg } from '../components/auth/ErrMsg';
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
  return 'Something went wrong. Please try again.';
}

function formatTimeLeft(expiresAt: string): string {
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return '0 min';
  const mins = Math.ceil(ms / 60000);
  return `${mins} min`;
}

export function VerifyDiscordPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [discordUsername, setDiscordUsername] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const applyStatus = useCallback(
    (status: DiscordVerificationStatus) => {
      if (status.status === 'verified') {
        setVerified(true);
        setDiscordUsername(status.discordUsername);
        setCode(null);
        stopPolling();
        return;
      }
      if (status.status === 'pending') {
        setCode(status.code);
        setExpiresAt(status.expiresAt);
        setVerified(false);
        return;
      }
      if (status.status === 'expired') {
        setCode(null);
        setExpiresAt(null);
        setError('Your verification code expired. Generate a new one below.');
        stopPolling();
        return;
      }
      setCode(null);
      setExpiresAt(null);
    },
    [stopPolling],
  );

  const pollStatus = useCallback(async () => {
    try {
      const status = await api.get<DiscordVerificationStatus>(API_ROUTES.VERIFICATION.DISCORD_STATUS);
      applyStatus(status);
    } catch {
      /* ignore transient poll errors */
    }
  }, [applyStatus]);

  const startPolling = useCallback(() => {
    stopPolling();
    pollRef.current = setInterval(pollStatus, 2000);
  }, [pollStatus, stopPolling]);

  const generateCode = useCallback(async () => {
    setError('');
    setGenerating(true);
    try {
      const result = await api.post<DiscordVerificationStartResponse>(
        API_ROUTES.VERIFICATION.DISCORD_START,
        {},
      );
      setCode(result.code);
      setExpiresAt(result.expiresAt);
      setVerified(false);
      startPolling();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setGenerating(false);
    }
  }, [startPolling]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      setError('');
      try {
        const status = await api.get<DiscordVerificationStatus>(API_ROUTES.VERIFICATION.DISCORD_STATUS);
        if (cancelled) return;

        if (status.status === 'verified') {
          applyStatus(status);
          return;
        }

        if (status.status === 'pending') {
          applyStatus(status);
          stopPolling();
          pollRef.current = setInterval(pollStatus, 2000);
          return;
        }

        if (status.status === 'expired') {
          setError('Your verification code expired. Generate a new one below.');
        }

        const result = await api.post<DiscordVerificationStartResponse>(
          API_ROUTES.VERIFICATION.DISCORD_START,
          {},
        );
        if (cancelled) return;
        setCode(result.code);
        setExpiresAt(result.expiresAt);
        stopPolling();
        pollRef.current = setInterval(pollStatus, 2000);
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
      stopPolling();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyCode() {
    if (!code) return;
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const commandText = code ? `/verify code:${code}` : '/verify code:OCT-XXXXXX';

  return (
    <AuthShell>
      <h2 className="auth-title">Verify your Discord account</h2>
      <p className="auth-subtitle">Step 3 of 3 — Link your Discord profile</p>
      <Steps current={3} />

      {loading ? (
        <p className="verify-loading">Preparing your verification code…</p>
      ) : verified ? (
        <div className="verify-success">
          <div className="verify-success__icon">✅</div>
          <div className="verify-success__title">Discord account verified!</div>
          <div className="verify-success__hint">
            {discordUsername ? (
              <>
                <strong>{discordUsername}</strong> is now linked to your Octergo account.
              </>
            ) : (
              'Your Discord account is now linked to Octergo.'
            )}
          </div>
          <GradBtn type="button" onClick={() => navigate('/select-plan')}>
            Continue to plan selection →
          </GradBtn>
        </div>
      ) : (
        <>
          <div className="verify-hint">
            <p className="verify-hint__title">How to verify</p>
            <ol className="verify-hint__list">
              <li>Join the Octergo Discord server (or your connected server with the bot).</li>
              <li>
                Go to the verification channel and run the slash command shown below.
              </li>
              <li>Wait on this page — it will update automatically once Discord confirms.</li>
            </ol>
          </div>

          {code && (
            <>
              <div className="verify-code-step__label">Run this command in Discord:</div>
              <div className="verify-command-box">
                <code>{commandText}</code>
                <button type="button" className="verify-copy-btn" onClick={copyCode}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="verify-code-step__hint">
                In Discord, type <strong>/verify</strong> and paste your code into the{' '}
                <strong>code</strong> field.
                {expiresAt && (
                  <>
                    {' '}
                    This code expires in <strong>{formatTimeLeft(expiresAt)}</strong>.
                  </>
                )}
              </p>
              <p className="verify-waiting">
                <span className="verify-waiting__dot" />
                Waiting for you to run the command in Discord…
              </p>
            </>
          )}

          <ErrMsg message={error} />

          <GradBtn type="button" onClick={generateCode} disabled={generating}>
            {generating ? 'Generating…' : code ? 'Generate new code' : 'Generate verification code'}
          </GradBtn>
        </>
      )}

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
        .verify-loading {
          font-size: 14px;
          color: #94a3b8;
          text-align: center;
          padding: 1rem 0;
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
          font-size: 13px;
          color: #94a3b8;
          margin: 0 0 8px;
        }
        .verify-command-box {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 10px;
        }
        .verify-command-box code {
          flex: 1;
          font-family: ui-monospace, monospace;
          font-size: 15px;
          font-weight: 700;
          color: #c084fc;
          letter-spacing: 0.04em;
          text-align: center;
          padding: 12px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(167, 139, 250, 0.25);
          border-radius: 10px;
        }
        .verify-copy-btn {
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid rgba(167, 139, 250, 0.3);
          background: rgba(167, 139, 250, 0.1);
          color: #a78bfa;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        .verify-code-step__hint {
          font-size: 12px;
          color: #64748b;
          margin: 0 0 14px;
          line-height: 1.5;
        }
        .verify-code-step__hint strong {
          color: #cbd5e1;
        }
        .verify-waiting {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #818cf8;
          margin: 0 0 14px;
        }
        .verify-waiting__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #818cf8;
          animation: pulse 1.2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .verify-success {
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 16px;
          text-align: center;
        }
        .verify-success__icon {
          font-size: 28px;
          margin-bottom: 8px;
        }
        .verify-success__title {
          font-size: 15px;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 4px;
        }
        .verify-success__hint {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 16px;
        }
        .verify-success__hint strong {
          color: #e2e8f0;
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
