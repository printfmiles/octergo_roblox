import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { theme } from '../../theme';

type ToastType = 'success' | 'error' | 'info';
interface ToastState {
  msg: string;
  type: ToastType;
}

const ToastContext = createContext<(msg: string, type?: ToastType) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  const show = useCallback((msg: string, type: ToastType = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const color =
    toast?.type === 'error' ? theme.red : toast?.type === 'info' ? theme.blue : theme.green;

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: color,
            color: '#fff',
            padding: '10px 18px',
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          {toast.msg}
        </div>
      )}
    </ToastContext.Provider>
  );
}
