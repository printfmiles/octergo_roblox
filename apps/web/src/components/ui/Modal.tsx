import type { ReactNode } from 'react';
import { theme } from '../../theme';

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  width?: number;
}

export function Modal({ title, subtitle, onClose, children, width = 440 }: ModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.bgElevated,
          border: `1px solid ${theme.borderStrong}`,
          borderRadius: 18,
          padding: '1.75rem',
          width: '100%',
          maxWidth: width,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ fontSize: 17, fontWeight: 800, color: theme.textBright, marginBottom: 4, letterSpacing: '-0.4px' }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 13, color: theme.textDim, marginBottom: 20 }}>{subtitle}</div>
        )}
        {children}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  required?: boolean;
  hint?: ReactNode;
  children: ReactNode;
}

export function ModalField({ label, required, hint, children }: FieldProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 6 }}>
        {label} {required && <span style={{ color: theme.red }}>*</span>}
      </label>
      {children}
      {hint && <div style={{ fontSize: 11, color: theme.textDimmer, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

export const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  background: 'rgba(255,255,255,0.05)',
  border: `1px solid ${theme.borderStrong}`,
  borderRadius: 10,
  color: '#fff',
  fontSize: 13,
  boxSizing: 'border-box',
  outline: 'none',
};
