interface ErrMsgProps {
  message?: string;
}

export function ErrMsg({ message }: ErrMsgProps) {
  if (!message) return null;
  return (
    <p className="err-msg">
      {message}
      <style>{`
        .err-msg {
          font-size: 12px;
          color: #ef4444;
          margin: 0 0 12px;
          line-height: 1.5;
        }
      `}</style>
    </p>
  );
}
