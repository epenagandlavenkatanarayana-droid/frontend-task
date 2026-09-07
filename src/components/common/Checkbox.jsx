import React, { forwardRef } from 'react';
import { Check, AlertCircle } from 'lucide-react';

const Checkbox = forwardRef(({
  label,
  id,
  error,
  checked,
  onChange,
  className = '',
  required = false,
  ...props
}, ref) => {
  const checkboxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = checkboxId ? `${checkboxId}-error` : undefined;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={checkboxId} className="flex items-start gap-3 cursor-pointer group select-none">
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className="sr-only peer"
            {...props}
          />
          <div className="w-5 h-5 rounded-md border border-slate-600 bg-slate-800/80 peer-checked:bg-indigo-600 peer-checked:border-indigo-500 peer-focus:ring-2 peer-focus:ring-indigo-500/40 transition-all duration-200 group-hover:border-indigo-400 flex items-center justify-center shadow-inner">
            <Check className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-150 stroke-[3]" />
          </div>
        </div>

        <div className="text-sm text-slate-300 group-hover:text-slate-100 leading-snug">
          {label}
          {required && <span className="text-indigo-400 ml-1" aria-hidden="true">*</span>}
        </div>
      </label>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-rose-400 flex items-center gap-1.5 ml-8 animate-fade-in"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
