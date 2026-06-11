import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shell } from '../layouts/Shell';
import { Wordmark } from '../components/Wordmark';
import { login } from '../lib/auth';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  }

  return (
    <Shell>
      <div style={containerStyle}>
        <Wordmark />
        <h1 style={{ marginTop: 24 }}>Sign in</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: '#ef4444', margin: 0, fontSize: 14 }}>{error}</p>}
          <button type="submit">Sign in</button>
        </form>
        <p style={{ color: '#64748b', fontSize: 14 }}>
          No account? <Link to="/register" style={{ color: '#a78bfa' }}>Register</Link>
        </p>
      </div>
    </Shell>
  );
}

const containerStyle: React.CSSProperties = {
  maxWidth: 400,
  margin: '4rem auto',
  padding: '0 1.5rem',
};

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginTop: 24,
};
