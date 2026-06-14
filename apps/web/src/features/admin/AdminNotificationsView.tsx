import { useState } from 'react';
import { Card, PageIntro, inputStyle, useToast } from '../../components/ui';
import { theme } from '../../theme';

const AUDIENCES = ['All owners', 'Pro & Enterprise', 'Enterprise only', 'Trialing users'];

const SENT = [
  { id: 1, title: 'Scheduled maintenance Jun 20', audience: 'All owners', time: '2 days ago' },
  { id: 2, title: 'New: automatic role sync', audience: 'Pro & Enterprise', time: '1 week ago' },
];

export function AdminNotificationsView() {
  const toast = useToast();
  const [audience, setAudience] = useState(AUDIENCES[0]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  function send() {
    if (!title.trim() || !body.trim()) {
      toast('Title and message are required', 'error');
      return;
    }
    toast(`Notification sent to: ${audience}`);
    setTitle('');
    setBody('');
  }

  return (
    <div style={{ maxWidth: 720 }}>
      <PageIntro title="Notifications" subtitle="Broadcast announcements to community owners" />

      <Card padding="1.5rem" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 16 }}>New broadcast</div>

        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Audience</label>
        <select value={audience} onChange={(e) => setAudience(e.target.value)} style={{ ...inputStyle, marginBottom: 14, colorScheme: 'dark' }}>
          {AUDIENCES.map((a) => (
            <option key={a} value={a} style={{ background: theme.bgElevated }}>
              {a}
            </option>
          ))}
        </select>

        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notification title" style={{ ...inputStyle, marginBottom: 14 }} />

        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Message</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your announcement…" rows={4} style={{ ...inputStyle, marginBottom: 16, resize: 'none' }} />

        <button
          onClick={send}
          style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: theme.gradient, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 700 }}
        >
          Send notification
        </button>
      </Card>

      <div style={{ fontSize: 13, fontWeight: 700, color: theme.textFaint, letterSpacing: '0.06em', marginBottom: 12 }}>RECENTLY SENT</div>
      {SENT.map((n) => (
        <Card key={n.id} padding="1rem 1.25rem" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 600 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: theme.textFaint }}>To: {n.audience}</div>
            </div>
            <span style={{ fontSize: 11, color: theme.textDimmer }}>{n.time}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
