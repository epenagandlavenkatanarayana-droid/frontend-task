import React, { useRef, useEffect } from 'react';

const OtpInput = ({
  value = '',
  onChange,
  length = 6,
  error = null,
  isDisabled = false,
  autoFocus = true
}) => {
  const inputRefs = useRef([]);

  // Ensure refs array has correct length
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  // Focus first input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !isDisabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, isDisabled]);

  // Array of digits from value string
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  const handleChange = (e, index) => {
    const val = e.target.value;
    // Extract last entered digit
    const digit = val.replace(/\D/g, '').slice(-1);
    
    const newDigits = [...digits];
    newDigits[index] = digit;
    const newValue = newDigits.join('');
    
    onChange(newValue);

    // Auto-focus next input if digit was typed
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        // Focus previous input if current box is already empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const numericData = pastedData.replace(/\D/g, '').slice(0, length);
    
    if (numericData) {
      onChange(numericData);
      // Focus appropriate box after paste
      const nextFocusIndex = Math.min(numericData.length, length - 1);
      inputRefs.current[nextFocusIndex]?.focus();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="flex items-center justify-between gap-2 sm:gap-3 w-full max-w-sm" onPaste={handlePaste}>
        {Array.from({ length }).map((_, index) => {
          const isFilled = Boolean(digits[index]);
          return (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digits[index]}
              disabled={isDisabled}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-label={`OTP Digit ${index + 1}`}
              className={`
                w-10 h-12 sm:w-12 sm:h-14 text-center font-bold text-lg sm:text-xl rounded-xl
                glass-input transition-all duration-200 outline-none
                ${isFilled ? 'border-indigo-500 text-indigo-300 bg-indigo-500/10 shadow-inner' : 'border-slate-700/70 text-white'}
                ${error ? 'border-rose-500/90 text-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30' : 'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40'}
                disabled:opacity-40 disabled:cursor-not-allowed
              `}
            />
          );
        })}
      </div>
      
      {error && (
        <p className="text-xs font-medium text-rose-400 text-center animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default OtpInput;
