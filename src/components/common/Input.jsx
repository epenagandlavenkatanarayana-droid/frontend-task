import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

const Input = forwardRef(({
  label,
  id,
  type = 'text',
  error,
  helperText,
  icon: Icon = null,
  rightElement = null,
  className = '',
  required = false,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;
  const helperId = inputId ? `${inputId}-helper` : undefined;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wide text-slate-300 flex items-center gap-1 uppercase"
        >
          {label}
          {required && <span className="text-indigo-400" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          className={`
            w-full rounded-xl text-sm text-slate-100 placeholder-slate-500
            glass-input py-3 px-4 transition-all duration-200 outline-none
            ${Icon ? 'pl-10' : ''}
            ${rightElement ? 'pr-12' : ''}
            ${error ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30' : 'border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'}
          `}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {helperText && !error && (
        <p id={helperId} className="text-xs text-slate-400 leading-normal">
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-rose-400 flex items-center gap-1.5 mt-0.5 animate-fade-in"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
