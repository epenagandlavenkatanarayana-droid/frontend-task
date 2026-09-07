import React, { forwardRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

const Select = forwardRef(({
  label,
  id,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  disabled = false,
  required = false,
  className = '',
  icon: Icon = null,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = selectId ? `${selectId}-error` : undefined;
  const helperId = selectId ? `${selectId}-helper` : undefined;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
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

        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`
            w-full rounded-xl text-sm text-slate-100 appearance-none
            glass-input py-3 px-4 transition-all duration-200 outline-none cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-10' : ''}
            pr-10
            ${error ? 'border-rose-500/80 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30' : 'border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30'}
          `}
          {...props}
        >
          <option value="" disabled className="bg-slate-900 text-slate-400">
            {placeholder}
          </option>
          {options.map((opt) => {
            const value = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={value} value={value} className="bg-slate-900 text-slate-100">
                {optLabel}
              </option>
            );
          })}
        </select>

        <div className="absolute right-3.5 pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
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

Select.displayName = 'Select';

export default Select;
