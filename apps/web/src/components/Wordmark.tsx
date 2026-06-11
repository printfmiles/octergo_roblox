import { Logo } from './Logo';

interface WordmarkProps {
  size?: number;
}

export function Wordmark({ size = 28 }: WordmarkProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, userSelect: 'none' }}>
      <Logo size={size} />
      <span
        style={{
          fontSize: size * 0.57,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-0.5px',
        }}
      >
        octergo
      </span>
    </div>
  );
}
