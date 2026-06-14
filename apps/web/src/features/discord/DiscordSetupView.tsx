import { useState } from 'react';
import { Card, Icon, useToast, inputStyle } from '../../components/ui';
import { theme } from '../../theme';

export function DiscordSetupView() {
  const toast = useToast();
  const [webhook, setWebhook] = useState('');
  const [channel, setChannel] = useState('#octergo-logs');
  const [tested, setTested] = useState(false);

  function test() {
    if (!webhook) {
      toast('Enter a webhook URL first', 'error');
      return;
    }
    setTested(true);
    toast('Test message sent!');
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Card style={{ marginBottom: 16 }} padding="1.5rem">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: 'rgba(129,140,248,0.12)',
              border: '1px solid rgba(129,140,248,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="discord" size={20} color={theme.blue} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Discord Bot</div>
            <div style={{ fontSize: 12, color: theme.textFaint }}>Invite the bot and configure logging</div>
          </div>
        </div>

        <a
          href="https://discord.com/oauth2/authorize"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 18px',
            borderRadius: 10,
            background: 'rgba(88,101,242,0.12)',
            border: '1px solid rgba(88,101,242,0.4)',
            color: theme.blue,
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          <Icon name="discord" size={16} color={theme.blue} />
          Invite Octergo Bot
        </a>

        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Log channel</label>
        <input value={channel} onChange={(e) => setChannel(e.target.value)} style={{ ...inputStyle, marginBottom: 14 }} />

        <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Webhook URL</label>
        <input
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          placeholder="https://discord.com/api/webhooks/…"
          style={{ ...inputStyle, marginBottom: 12 }}
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={test}
            style={{
              padding: '9px 18px',
              borderRadius: 8,
              border: '1px solid rgba(88,101,242,0.4)',
              background: 'rgba(88,101,242,0.1)',
              color: theme.blue,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Send test message
          </button>
          <button
            onClick={() => toast('Discord settings saved!')}
            style={{
              padding: '9px 18px',
              borderRadius: 8,
              border: 'none',
              background: theme.gradient,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Save
          </button>
        </div>
        {tested && (
          <div style={{ marginTop: 10, fontSize: 12, color: theme.green }}>
            ✓ Webhook active — logs will appear in {channel}
          </div>
        )}
      </Card>

      <Card padding="1.5rem">
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 12 }}>Log preview</div>
        {[
          { color: theme.green, title: '✅ Member Promoted', lines: ['CoolGamer123 was promoted by Admin', 'Member → Senior Member'] },
          { color: theme.red, title: '🚫 Member Terminated', lines: ['xXHackerXx was terminated by Admin', 'Exploiting and ban evasion'] },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: 10,
              padding: '1rem',
              borderLeft: `4px solid ${card.color}`,
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: card.color, marginBottom: 4 }}>{card.title}</div>
            {card.lines.map((l) => (
              <div key={l} style={{ fontSize: 12, color: theme.textMuted }}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </Card>
    </div>
  );
}
