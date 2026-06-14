import { PricingCards } from '../../components/marketing/PricingCards';
import { theme } from '../../theme';

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes — every plan includes a 7-day free trial. No credit card required to start.' },
  { q: 'Can I change plans later?', a: 'Absolutely. Upgrade or downgrade at any time from your billing settings; changes are prorated.' },
  { q: 'What counts as a "group"?', a: 'A group is one linked Roblox community. Each plan allows a different number of linked groups.' },
  { q: 'Do you offer refunds?', a: 'If Octergo is not working out within the first 14 days, contact support for a full refund.' },
];

export function PricingPage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '4rem 2rem 5rem', position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: theme.accent, letterSpacing: '0.1em', marginBottom: 10 }}>
          PRICING
        </div>
        <h1 style={{ fontSize: 'clamp(30px,5vw,46px)', fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-1.5px' }}>
          Simple, transparent pricing
        </h1>
        <p style={{ fontSize: 15, color: theme.textFaint, margin: 0 }}>
          All plans include a 7-day free trial. Cancel anytime.
        </p>
      </div>

      <PricingCards />

      <div style={{ marginTop: 64 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 24, letterSpacing: '-0.5px' }}>
          Frequently asked questions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 14 }}>
          {faqs.map((f) => (
            <div
              key={f.q}
              style={{
                background: theme.bgCard,
                border: `1px solid ${theme.border}`,
                borderRadius: 14,
                padding: '1.25rem',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{f.q}</div>
              <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
