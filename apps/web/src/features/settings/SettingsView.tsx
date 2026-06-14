import { useState } from 'react';
import { Card, PageIntro, inputStyle, useToast } from '../../components/ui';
import { theme } from '../../theme';

export function SettingsView() {
  const toast = useToast();
  const [name, setName] = useState('Admin');
  const [email, setEmail] = useState('owner@novarp.gg');
  const [notifyDiscord, setNotifyDiscord] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  return (
    <div style={{ maxWidth: 640 }}>
      <PageIntro title="Settings" subtitle="Manage your account preferences" />

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Profile</div>
        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Display name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ ...inputStyle, marginBottom: 14 }} />
        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...inputStyle, marginBottom: 16 }} />
        <button
          onClick={() => toast('Profile saved!')}
          style={{ padding: '9px 20px', borderRadius: 8, border: 'none', background: theme.gradient, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}
        >
          Save changes
        </button>
      </Card>

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Notifications</div>
        {[
          { label: 'Discord notifications', desc: 'Send action alerts to your Discord server', value: notifyDiscord, set: setNotifyDiscord },
          { label: 'Email notifications', desc: 'Weekly activity summary by email', value: notifyEmail, set: setNotifyEmail },
        ].map((row) => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{row.label}</div>
              <div style={{ fontSize: 12, color: theme.textFaint }}>{row.desc}</div>
            </div>
            <button
              onClick={() => row.set((v) => !v)}
              style={{
                width: 46,
                height: 26,
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                background: row.value ? theme.gradient : 'rgba(255,255,255,0.1)',
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 3,
                  left: row.value ? 23 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'left .15s',
                }}
              />
            </button>
          </div>
        ))}
      </Card>

      <Card padding="1.5rem">
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Danger Zone</div>
        <div style={{ fontSize: 13, color: theme.textFaint, marginBottom: 12 }}>These actions are irreversible</div>
        <button
          onClick={() => toast('Account deletion requested', 'error')}
          style={{ padding: '9px 20px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: theme.red, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
        >
          Delete Account
        </button>
      </Card>
    </div>
  );
}
