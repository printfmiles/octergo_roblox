import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { ErrMsg } from '../components/auth/ErrMsg';
import { Field } from '../components/auth/Field';
import { GradBtn } from '../components/auth/GradBtn';
import { ApiError } from '../lib/api';
import { useAuth } from '../lib/auth-context';
import { login } from '../lib/auth';

function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.statusCode === 0) {
      return 'Cannot reach the API. Make sure the backend is running on http://localhost:3000';
    }
    if (err.statusCode === 401) {
      return 'Invalid email or password.';
    }
    return err.message;
  }
  return 'Sign in failed. Please try again.';
}

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth();
  const from = (location.state as { from?: string } | null)?.from;
  const redirectTo = from?.startsWith('/') ? from : '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      await refreshUser();
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Sign in to your Octergo account</p>

      <form onSubmit={handleSubmit}>
        <Field
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <ErrMsg message={error} />
        <GradBtn type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </GradBtn>
      </form>

      <p className="auth-footer">
        No account? <Link to="/register">Create one</Link>
      </p>
      <p className="auth-footer auth-footer--muted">
        <Link to="/">← Back to home</Link>
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
          margin: 0 0 24px;
        }
        .auth-footer {
          text-align: center;
          margin-top: 16px;
          font-size: 13px;
          color: #475569;
        }
        .auth-footer a {
          color: #a78bfa;
        }
        .auth-footer--muted {
          margin-top: 8px;
        }
        .auth-footer--muted a {
          color: #475569;
        }
      `}</style>
    </AuthShell>
  );
}
