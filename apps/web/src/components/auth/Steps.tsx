interface StepsProps {
  current: number;
}

const STEPS = ['Account', 'Roblox', 'Discord'];

export function Steps({ current }: StepsProps) {
  return (
    <div className="steps">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;

        return (
          <div key={label} className="steps__item">
            <div className="steps__node-wrap">
              <div
                className={`steps__node${done ? ' steps__node--done' : ''}${active ? ' steps__node--active' : ''}`}
              >
                {done ? '✓' : stepNum}
              </div>
              <span
                className={`steps__label${done ? ' steps__label--done' : ''}${active ? ' steps__label--active' : ''}`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`steps__line${done ? ' steps__line--done' : ''}`} />
            )}
          </div>
        );
      })}
      <style>{`
        .steps {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
        }
        .steps__item {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .steps__item:last-child {
          flex: none;
        }
        .steps__node-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .steps__node {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #fff;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .steps__node--done {
          background: #22c55e;
          border: none;
        }
        .steps__node--active {
          background: linear-gradient(135deg, #9333ea, #6366f1);
          border: none;
        }
        .steps__label {
          font-size: 10px;
          color: #475569;
        }
        .steps__label--done {
          color: #22c55e;
        }
        .steps__label--active {
          color: #a78bfa;
        }
        .steps__line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 0 6px 14px;
        }
        .steps__line--done {
          background: rgba(34, 197, 94, 0.3);
        }
      `}</style>
    </div>
  );
}
