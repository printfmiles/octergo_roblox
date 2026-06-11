import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shell } from '../layouts/Shell';
import { Wordmark } from '../components/Wordmark';
import { register } from '../lib/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, username);
      navigate('/verify/roblox');
    } catch {
      setError('Registration failed. Please try again.');
    }
  }

  return (
    <Shell>
      <div style={containerStyle}>
        <Wordmark />
        <h1 style={{ marginTop: 24 }}>Create account</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit">Create account</button>
        </form>
        <p style={{ color: '#64748b', fontSize: 14 }}>
          Already have an account? <Link to="/login" style={{ color: '#a78bfa' }}>Sign in</Link>
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
