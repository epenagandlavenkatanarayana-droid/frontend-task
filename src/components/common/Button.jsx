import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  onClick,
  className = '',
  icon: Icon = null,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0b0f19] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none select-none';

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 focus:ring-indigo-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 focus:ring-slate-500 shadow-sm',
    outline: 'border-2 border-indigo-500/40 hover:border-indigo-500 text-indigo-300 hover:text-white bg-indigo-500/5 hover:bg-indigo-500/10 focus:ring-indigo-500',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/60 focus:ring-slate-500',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20 focus:ring-rose-500'
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 shadow-md'
  };

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
