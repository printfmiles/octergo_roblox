import type { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="shell">
      <div className="shell__glow shell__glow--top" />
      <div className="shell__glow shell__glow--bottom" />
      <div className="shell__content">{children}</div>
      <style>{`
        .shell {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }
        .shell__glow {
          position: fixed;
          pointer-events: none;
          z-index: 0;
        }
        .shell__glow--top {
          top: -25%;
          left: -10%;
          width: 60%;
          height: 65%;
          background: radial-gradient(ellipse, rgba(120, 50, 230, 0.2) 0%, transparent 70%);
        }
        .shell__glow--bottom {
          bottom: -15%;
          right: -5%;
          width: 45%;
          height: 55%;
          background: radial-gradient(ellipse, rgba(80, 40, 190, 0.13) 0%, transparent 70%);
        }
        .shell__content {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
