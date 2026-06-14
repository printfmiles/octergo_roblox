import { useNavigate } from 'react-router-dom';
import { PLAN_LIMITS, SubscriptionPlan } from '@octergo/shared';
import { theme } from '../../theme';

const PLAN_FEATURES: Record<SubscriptionPlan, string[]> = {
  [SubscriptionPlan.STARTER]: ['Warn users', 'Discord logging', '1 group', '100 logs/month', 'Email support'],
  [SubscriptionPlan.PRO]: ['Warn, Promote & Demote', 'Discord logging', '3 groups', '1,000 logs/month', 'Priority support'],
  [SubscriptionPlan.ENTERPRISE]: ['All actions incl. Terminate', 'Promote & Demote', 'Discord logging', '10 groups', 'Unlimited logs', '24/7 dedicated support'],
};

const order = [SubscriptionPlan.STARTER, SubscriptionPlan.PRO, SubscriptionPlan.ENTERPRISE];

interface PricingCardsProps {
  ctaLabel?: string;
}

export function PricingCards({ ctaLabel }: PricingCardsProps) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: 16,
        maxWidth: 880,
        margin: '0 auto',
        textAlign: 'left',
      }}
    >
      {order.map((plan) => {
        const config = PLAN_LIMITS[plan];
        const isPro = plan === SubscriptionPlan.PRO;
        return (
          <div
            key={plan}
            style={{
              position: 'relative',
              background: isPro ? 'rgba(167,139,250,0.07)' : theme.bgCard,
              border: isPro ? `1px solid ${theme.accentBorder}` : `1px solid ${theme.border}`,
              borderRadius: 16,
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {isPro && (
              <div
                style={{
                  position: 'absolute',
                  top: -13,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: theme.gradient,
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '4px 14px',
                  borderRadius: 20,
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}
              >
                MOST POPULAR
              </div>
            )}
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: isPro ? theme.accent : theme.textFaint,
                letterSpacing: '0.08em',
                marginBottom: 4,
              }}
            >
              {config.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 34, fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', marginBottom: 2 }}>
              ${config.price}
              <span style={{ fontSize: 14, fontWeight: 400, color: theme.textDim }}>/mo</span>
            </div>
            <div style={{ fontSize: 12, color: theme.textDim, marginBottom: 20 }}>
              Billed monthly · cancel anytime
            </div>
            <div style={{ flex: 1, marginBottom: 20 }}>
              {PLAN_FEATURES[plan].map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: isPro ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 9,
                      color: isPro ? theme.accent : theme.textMuted,
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ fontSize: 13, color: theme.textMuted }}>{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/register')}
              style={{
                width: '100%',
                padding: '11px',
                borderRadius: 10,
                border: isPro ? 'none' : `1px solid ${theme.borderStrong}`,
                background: isPro ? theme.gradient : 'transparent',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {ctaLabel ?? `Get ${config.name}`}
            </button>
          </div>
        );
      })}
    </div>
  );
}
