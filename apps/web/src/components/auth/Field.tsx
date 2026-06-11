import type { InputHTMLAttributes } from 'react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Field({ label, hint, ...inputProps }: FieldProps) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      <input className="field__input" {...inputProps} />
      {hint && <p className="field__hint">{hint}</p>}
      <style>{`
        .field {
          margin-bottom: 14px;
        }
        .field__label {
          font-size: 12px;
          color: #94a3b8;
          display: block;
          margin-bottom: 6px;
        }
        .field__input {
          width: 100%;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #fff;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
        }
        .field__input:focus {
          border-color: rgba(167, 139, 250, 0.5);
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.12);
        }
        .field__hint {
          font-size: 11px;
          color: #475569;
          margin: 4px 0 0;
        }
      `}</style>
    </div>
  );
}
