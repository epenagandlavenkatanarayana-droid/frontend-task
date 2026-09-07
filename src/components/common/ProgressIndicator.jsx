import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { step: 1, label: 'Personal' },
  { step: 2, label: 'Contact' },
  { step: 3, label: 'Education' },
  { step: 4, label: 'Preferences' }
];

const ProgressIndicator = ({ currentStep = 1, totalSteps = 4 }) => {
  const percentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full flex flex-col gap-3 py-2 select-none">
      {/* Header text with Step info */}
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-indigo-400 font-semibold tracking-wider uppercase">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-slate-400">
          {STEPS[currentStep - 1]?.label} Details
        </span>
      </div>

      {/* Progress Bar & Connected Nodes */}
      <div className="relative flex items-center justify-between my-1">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-slate-800 rounded-full z-0" />
        
        {/* Active progress fill line */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 rounded-full transition-all duration-500 ease-out z-0 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
          style={{ width: `${percentage}%` }}
        />

        {/* Step Nodes */}
        {STEPS.map(({ step, label }) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center group">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs
                  transition-all duration-300 transform
                  ${isCompleted ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-100' : ''}
                  ${isCurrent ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white ring-4 ring-indigo-500/20 scale-110 shadow-lg shadow-indigo-500/40' : ''}
                  ${!isCompleted && !isCurrent ? 'bg-slate-800 text-slate-500 border border-slate-700' : ''}
                `}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>{step}</span>
                )}
              </div>

              {/* Node label for tablet/desktop */}
              <span
                className={`
                  hidden sm:block absolute top-10 text-[11px] font-medium tracking-tight whitespace-nowrap transition-colors duration-200
                  ${isCurrent ? 'text-indigo-300 font-semibold' : isCompleted ? 'text-slate-300' : 'text-slate-500'}
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
