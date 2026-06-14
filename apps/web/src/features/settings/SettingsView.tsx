import { useEffect, useState } from 'react';
import { API_ROUTES } from '@octergo/shared';
import type { UserProfile } from '@octergo/shared';
import { Card, PageIntro, inputStyle, useToast } from '../../components/ui';
import { api, ApiError } from '../../lib/api';
import { useAuth } from '../../lib/auth-context';
import { theme } from '../../theme';

export function SettingsView() {
  const toast = useToast();
  const { refreshUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifyDiscord, setNotifyDiscord] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [notificationError, setNotificationError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setProfileError('');
      setNotificationError('');
      try {
        const user = await api.get<UserProfile>(API_ROUTES.AUTH.ME);
        if (cancelled) return;
        setName(user.username);
        setEmail(user.email);
        setNotifyDiscord(user.notifyDiscord ?? true);
        setNotifyEmail(user.notifyEmail ?? false);
      } catch (err) {
        if (!cancelled) {
          setProfileError(err instanceof ApiError ? err.message : 'Failed to load settings');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function saveProfile() {
    if (!name.trim()) {
      toast('Display name is required', 'error');
      return;
    }
    if (!email.trim()) {
      toast('Email is required', 'error');
      return;
    }

    setSavingProfile(true);
    setProfileError('');
    try {
      const user = await api.patch<UserProfile>(API_ROUTES.AUTH.ME, {
        username: name.trim(),
        email: email.trim(),
      });
      setName(user.username);
      setEmail(user.email);
      await refreshUser();
      toast('Profile saved!');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to save profile';
      setProfileError(message);
      toast(message, 'error');
    } finally {
      setSavingProfile(false);
    }
  }

  async function saveNotifications() {
    setSavingNotifications(true);
    setNotificationError('');
    try {
      const user = await api.patch<UserProfile>(API_ROUTES.AUTH.ME, {
        notifyDiscord,
        notifyEmail,
      });
      setNotifyDiscord(user.notifyDiscord ?? true);
      setNotifyEmail(user.notifyEmail ?? false);
      toast('Notification preferences saved!');
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to save notification preferences';
      setNotificationError(message);
      toast(message, 'error');
    } finally {
      setSavingNotifications(false);
    }
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 640 }}>
        <PageIntro subtitle="Manage your account preferences" />
        <p style={{ fontSize: 13, color: theme.textFaint }}>Loading settings…</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <PageIntro subtitle="Manage your account preferences" />

      {profileError && (
        <div style={{ fontSize: 13, color: theme.red, marginBottom: 12 }}>{profileError}</div>
      )}

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Profile</div>
        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Display name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ ...inputStyle, marginBottom: 14 }} />
        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...inputStyle, marginBottom: 16 }} />
        <button
          type="button"
          onClick={saveProfile}
          disabled={savingProfile}
          style={{
            padding: '9px 20px',
            borderRadius: 8,
            border: 'none',
            background: theme.gradient,
            color: '#fff',
            cursor: savingProfile ? 'wait' : 'pointer',
            fontSize: 13,
            fontWeight: 700,
            opacity: savingProfile ? 0.7 : 1,
          }}
        >
          {savingProfile ? 'Saving…' : 'Save changes'}
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
              type="button"
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
        {notificationError && (
          <div style={{ fontSize: 12, color: theme.red, marginBottom: 12 }}>{notificationError}</div>
        )}
        <button
          type="button"
          onClick={saveNotifications}
          disabled={savingNotifications}
          style={{
            padding: '9px 20px',
            borderRadius: 8,
            border: 'none',
            background: theme.gradient,
            color: '#fff',
            cursor: savingNotifications ? 'wait' : 'pointer',
            fontSize: 13,
            fontWeight: 700,
            opacity: savingNotifications ? 0.7 : 1,
          }}
        >
          {savingNotifications ? 'Saving…' : 'Save notification preferences'}
        </button>
      </Card>

      <Card padding="1.5rem">
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Danger Zone</div>
        <div style={{ fontSize: 13, color: theme.textFaint, marginBottom: 12 }}>These actions are irreversible</div>
        <button
          type="button"
          onClick={() => toast('Account deletion requested', 'error')}
          style={{ padding: '9px 20px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: theme.red, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
        >
          Delete Account
        </button>
      </Card>
    </div>
  );
}
