import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useSignup } from '../../context/SignupContext';

const Toast = () => {
  const { toast, hideToast } = useSignup();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-emerald-950/80 text-emerald-200',
    error: 'border-rose-500/40 bg-rose-950/80 text-rose-200',
    warning: 'border-amber-500/40 bg-amber-950/80 text-amber-200',
    info: 'border-indigo-500/40 bg-slate-900/90 text-slate-100'
  };

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 left-5 sm:left-auto sm:max-w-md z-50 animate-toast"
    >
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl
          ${borderColors[toast.type] || borderColors.info}
        `}
      >
        {icons[toast.type] || icons.info}
        <p className="text-xs sm:text-sm font-medium leading-snug flex-1">
          {toast.message}
        </p>
        <button
          onClick={hideToast}
          aria-label="Close notification"
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
