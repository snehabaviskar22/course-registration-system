import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const config: Record<ToastType, { icon: typeof CheckCircle2; classes: string; bar: string }> = {
  success: { icon: CheckCircle2, classes: 'border-emerald-200 bg-emerald-50', bar: 'bg-emerald-500' },
  error: { icon: XCircle, classes: 'border-red-200 bg-red-50', bar: 'bg-red-500' },
  info: { icon: Info, classes: 'border-brand-200 bg-brand-50', bar: 'bg-brand-500' },
  warning: { icon: AlertTriangle, classes: 'border-amber-200 bg-amber-50', bar: 'bg-amber-500' },
};

const iconColor: Record<ToastType, string> = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-brand-500',
  warning: 'text-amber-500',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const { icon: Icon, classes, bar } = config[toast.type];
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border ${classes} shadow-float px-4 py-3.5 animate-slide-in-right dark:bg-slate-800 dark:border-slate-700`}
            >
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor[toast.type]}`} />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 flex-1">{toast.message}</p>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${bar} rounded-b-2xl animate-[shrink_4s_ease-in-out]`} style={{ transformOrigin: 'left' }} />
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
