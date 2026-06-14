import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthShell } from '../components/auth/AuthShell';
import { ErrMsg } from '../components/auth/ErrMsg';
import { Field } from '../components/auth/Field';
import { GradBtn } from '../components/auth/GradBtn';
import { Steps } from '../components/auth/Steps';
import { ApiError } from '../lib/api';
import { register } from '../lib/auth';
import { useAuth } from '../lib/auth-context';

function getErrorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    if (err.statusCode === 0) {
      return 'Cannot reach the API. Make sure the backend is running on http://localhost:3000';
    }
    return err.message;
  }
  return 'Registration failed. Please try again.';
}

export function RegisterPage() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, username);
      await refreshUser();
      navigate('/verify/roblox');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell>
      <h2 className="auth-title">Create your account</h2>
      <p className="auth-subtitle">Step 1 of 3 — Account details</p>
      <Steps current={1} />

      <form onSubmit={handleSubmit}>
        <div className="auth-row">
          <div className="auth-row__col">
            <Field
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="YourUsername"
              autoComplete="username"
            />
          </div>
          <div className="auth-row__col">
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>

        <Field
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          autoComplete="new-password"
        />
        <Field
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
          autoComplete="new-password"
        />

        <ErrMsg message={error} />
        <GradBtn type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Continue →'}
        </GradBtn>
      </form>

      <p className="auth-footer">
        Have an account? <Link to="/login">Sign in</Link>
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
          margin: 0 0 20px;
        }
        .auth-row {
          display: flex;
          gap: 8px;
        }
        .auth-row__col {
          flex: 1;
        }
        .auth-footer {
          text-align: center;
          margin-top: 14px;
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
