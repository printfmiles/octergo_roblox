import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components/ui';
import type { IconName } from '../../components/ui';
import { theme } from '../../theme';

const docs: { icon: IconName; title: string; desc: string; color: string }[] = [
  { icon: 'roblox', title: 'Getting Started', desc: 'Create your account, verify Roblox & Discord, and link your first community.', color: theme.accent },
  { icon: 'discord', title: 'Discord Bot Setup', desc: 'Invite the bot, set the log channel, and run /verify in your server.', color: theme.blue },
  { icon: 'link', title: 'Role Mapping & Sync', desc: 'Map Roblox ranks to Discord roles and configure automatic syncing.', color: theme.green },
  { icon: 'shield', title: 'Moderation', desc: 'Understand warn, promote, demote and terminate actions and plan limits.', color: theme.orange },
  { icon: 'card', title: 'Billing & Plans', desc: 'Manage your subscription, upgrade, and view invoices.', color: theme.accentBright },
  { icon: 'file', title: 'API & Webhooks', desc: 'Reference for webhook payloads and the bot-internal API.', color: theme.pink },
];

const faqs = [
  { q: 'The Discord bot isn’t posting logs', a: 'Make sure the bot has permission to send messages and embeds in your configured log channel, then send a test message from Discord Bot Setup.' },
  { q: 'Roblox verification keeps failing', a: 'Confirm the exact code is in your Roblox profile bio and that you saved your profile before clicking verify.' },
  { q: 'Role sync seems delayed', a: 'Scheduled syncs run periodically; use “Sync now” on the Role Sync page to force an immediate sync.' },
];

export function SupportPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 2rem 5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: theme.accent, letterSpacing: '0.1em', marginBottom: 10 }}>
          SUPPORT & DOCS
        </div>
        <h1 style={{ fontSize: 'clamp(30px,5vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-1.5px' }}>
          How can we help?
        </h1>
        <p style={{ fontSize: 15, color: theme.textFaint, margin: '0 auto', maxWidth: 520, lineHeight: 1.7 }}>
          Browse the documentation, check the FAQ, or reach our team directly.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, marginBottom: 56 }}>
        {docs.map((d) => (
          <div
            key={d.title}
            style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '1.5rem' }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: `${d.color}18`,
                border: `1px solid ${d.color}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
              }}
            >
              <Icon name={d.icon} size={18} color={d.color} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{d.title}</div>
            <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>{d.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.4px' }}>FAQ</h2>
          {faqs.map((f) => (
            <div
              key={f.q}
              style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 14, padding: '1.1rem', marginBottom: 12 }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.q}</div>
              <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 16, letterSpacing: '-0.4px' }}>Contact us</h2>
          <div style={{ background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '1.5rem' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>✅</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: theme.green, marginBottom: 4 }}>Message sent</div>
                <div style={{ fontSize: 13, color: theme.textFaint }}>Our team will get back to you by email.</div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                {['Your email', 'Subject'].map((ph) => (
                  <input
                    key={ph}
                    required
                    placeholder={ph}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: `1px solid ${theme.borderStrong}`,
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 13,
                      boxSizing: 'border-box',
                      marginBottom: 12,
                      outline: 'none',
                    }}
                  />
                ))}
                <textarea
                  required
                  placeholder="How can we help?"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${theme.borderStrong}`,
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 13,
                    boxSizing: 'border-box',
                    marginBottom: 12,
                    resize: 'none',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: 10,
                    border: 'none',
                    background: theme.gradient,
                    color: '#fff',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Send message
                </button>
              </form>
            )}
            <div style={{ marginTop: 16, fontSize: 13, color: theme.textFaint, textAlign: 'center' }}>
              Prefer chat?{' '}
              <a href="https://discord.gg/rQMuccG84H" target="_blank" rel="noreferrer" style={{ color: theme.accent }}>
                Join our Discord
              </a>
            </div>
          </div>
          <div style={{ marginTop: 16, fontSize: 13, color: theme.textFaint, textAlign: 'center' }}>
            Check live service health on the{' '}
            <Link to="/status" style={{ color: theme.accent }}>
              status page
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
