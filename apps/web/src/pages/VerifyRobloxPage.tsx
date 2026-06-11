import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '@octergo/shared';
import { Shell } from '../layouts/Shell';
import { PageHeader } from '../components/PageHeader';
import { api } from '../lib/api';

export function VerifyRobloxPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(API_ROUTES.VERIFICATION.ROBLOX, { robloxUsername: username });
      navigate('/verify/discord');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <div style={{ maxWidth: 480, margin: '4rem auto', padding: '0 1.5rem' }}>
        <PageHeader
          title="Verify Roblox account"
          subtitle="Link your Roblox username to sync group ranks and member data."
        />
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="text"
            placeholder="Roblox username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Roblox'}
          </button>
        </form>
      </div>
    </Shell>
  );
}
