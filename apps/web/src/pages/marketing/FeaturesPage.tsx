import { Link } from 'react-router-dom';
import { Icon } from '../../components/ui';
import type { IconName } from '../../components/ui';
import { theme } from '../../theme';

const sections: { icon: IconName; title: string; desc: string; color: string }[] = [
  { icon: 'roblox', title: 'Roblox Verification', desc: 'Securely link Roblox accounts via bio-code verification before granting any access.', color: theme.accent },
  { icon: 'discord', title: 'Discord Integration', desc: 'Connect your server, post action logs as rich embeds, and verify members with a slash command.', color: theme.blue },
  { icon: 'users', title: 'Member Management', desc: 'A live roster of every member with ranks, warnings, and verification status at a glance.', color: theme.green },
  { icon: 'link', title: 'Role Mapping', desc: 'Map Roblox group ranks to Discord roles once and let Octergo keep them in lockstep.', color: theme.accentBright },
  { icon: 'sync', title: 'Automatic Role Sync', desc: 'Promotions and demotions in Roblox flow to Discord automatically, on a schedule or on demand.', color: theme.cyan },
  { icon: 'calendar', title: 'Session Scheduling', desc: 'Plan trainings and events, assign hosts, and announce them to your community.', color: theme.amber },
  { icon: 'shield', title: 'Moderation Tools', desc: 'Warn, promote, demote and terminate with reasons — gated by your plan and fully logged.', color: theme.orange },
  { icon: 'file', title: 'Audit Logs', desc: 'A tamper-evident trail of every action, who took it, and why — exportable any time.', color: theme.pink },
];

export function FeaturesPage() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '4rem 2rem 5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: theme.accent, letterSpacing: '0.1em', marginBottom: 10 }}>
          FEATURES
        </div>
        <h1 style={{ fontSize: 'clamp(30px,5vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-1.5px' }}>
          Everything you need to run a community
        </h1>
        <p style={{ fontSize: 15, color: theme.textFaint, margin: '0 auto', maxWidth: 520, lineHeight: 1.7 }}>
          Octergo brings Roblox group management and Discord together into a single, reliable control plane.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
        {sections.map((s) => (
          <div
            key={s.title}
            style={{
              background: theme.bgCard,
              border: `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `${s.color}18`,
                border: `1px solid ${s.color}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
              }}
            >
              <Icon name={s.icon} size={20} color={s.color} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <Link
          to="/register"
          style={{
            display: 'inline-block',
            padding: '12px 30px',
            borderRadius: 10,
            background: theme.gradient,
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Start your free trial →
        </Link>
      </div>
    </div>
  );
}
