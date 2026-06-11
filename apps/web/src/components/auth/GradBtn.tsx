import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface GradBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function GradBtn({ children, ...props }: GradBtnProps) {
  return (
    <button className="grad-btn" {...props}>
      {children}
      <style>{`
        .grad-btn {
          width: 100%;
          padding: 11px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #9333ea, #6366f1);
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }
        .grad-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .grad-btn:not(:disabled):hover {
          filter: brightness(1.05);
        }
      `}</style>
    </button>
  );
}
