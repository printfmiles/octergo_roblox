import { useState } from 'react';
import { Card, Icon, useToast, inputStyle } from '../../components/ui';
import { theme } from '../../theme';

export function RobloxSetupView() {
  const toast = useToast();
  const [groupId, setGroupId] = useState('12345678');
  const [cookie, setCookie] = useState('');

  return (
    <div style={{ maxWidth: 640 }}>
      <Card style={{ marginBottom: 16 }} padding="1.5rem">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: theme.accentSoft,
              border: `1px solid ${theme.accentBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="roblox" size={20} color={theme.accent} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Roblox Connection</div>
            <div style={{ fontSize: 12, color: theme.textFaint }}>Link the Roblox group Octergo will manage</div>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 10px',
              borderRadius: 20,
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: theme.green }} />
            <span style={{ fontSize: 11, color: theme.green, fontWeight: 600 }}>Verified</span>
          </div>
        </div>

        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Roblox Group ID</label>
        <input value={groupId} onChange={(e) => setGroupId(e.target.value)} style={{ ...inputStyle, marginBottom: 4 }} />
        <div style={{ fontSize: 11, color: theme.textDimmer, marginBottom: 16 }}>
          Found in your group URL: roblox.com/groups/<span style={{ color: theme.accent }}>{groupId || '12345678'}</span>
        </div>

        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>
          Group Bot Cookie (.ROBLOSECURITY)
        </label>
        <input
          type="password"
          value={cookie}
          onChange={(e) => setCookie(e.target.value)}
          placeholder="••••••••••••••••"
          style={{ ...inputStyle, marginBottom: 4 }}
        />
        <div style={{ fontSize: 11, color: theme.amber, marginBottom: 16 }}>
          ⚠ Stored encrypted. Never share this cookie publicly.
        </div>

        <button
          onClick={() => toast('Roblox connection saved!')}
          style={{
            padding: '10px 20px',
            borderRadius: 10,
            border: 'none',
            background: theme.gradient,
            color: '#fff',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Save connection
        </button>
      </Card>

      <Card padding="1.5rem">
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Required permissions</div>
        {[
          'Manage group members & ranks',
          'Read group roles and rank order',
          'Accept / decline join requests',
        ].map((p) => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Icon name="check" size={14} color={theme.green} strokeWidth={2.4} />
            <span style={{ fontSize: 13, color: theme.textMuted }}>{p}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
