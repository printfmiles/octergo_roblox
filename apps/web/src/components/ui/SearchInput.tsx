import { theme } from '../../theme';

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = 'Search…' }: SearchInputProps) {
  return (
    <div style={{ position: 'relative' }}>
      <svg
        style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.textDim}
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '9px 14px 9px 36px',
          background: theme.bgCard,
          border: `1px solid ${theme.border}`,
          borderRadius: 10,
          color: theme.text,
          fontSize: 13,
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />
    </div>
  );
}
