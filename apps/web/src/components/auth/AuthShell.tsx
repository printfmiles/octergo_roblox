import type { ReactNode } from 'react';
import { Shell } from '../../layouts/Shell';
import { Navbar } from '../Navbar';
import { Wordmark } from '../Wordmark';

interface AuthShellProps {
  children: ReactNode;
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <Shell>
      <Navbar />
      <div className="auth-shell">
        <div className="auth-shell__brand">
          <Wordmark size={36} />
        </div>
        <div className="auth-shell__card">{children}</div>
      </div>
      <style>{`
        .auth-shell {
          min-height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .auth-shell__brand {
          margin-bottom: 28px;
        }
        .auth-shell__card {
          width: 100%;
          max-width: 430px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 2rem;
        }
      `}</style>
    </Shell>
  );
}
