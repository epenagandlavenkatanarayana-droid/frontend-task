import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, RotateCcw, ChevronLeft } from 'lucide-react';
import { useSignup } from '../../context/SignupContext';
import ProgressIndicator from '../common/ProgressIndicator';

const WizardLayout = ({ children, currentStep = null, showBack = false, onBack = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetWizard, email } = useSignup();

  const handleDefaultBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your signup progress?')) {
      resetWizard();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between relative overflow-hidden selection:bg-indigo-500 selection:text-white">
      {/* Background ambient lighting glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header Bar */}
      <header className="w-full max-w-5xl mx-auto px-4 py-5 flex items-center justify-between relative z-10">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wider bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
              NUBPACK
            </h1>
            <p className="text-[10px] uppercase font-semibold tracking-widest text-indigo-400">
              Pro Account Setup
            </p>
          </div>
        </div>

        {/* Action icons / Reset button */}
        <div className="flex items-center gap-3">
          {email && (
            <button
              onClick={handleReset}
              title="Reset Wizard State"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all duration-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Start Over</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-lg mx-auto px-4 py-6 flex-1 flex flex-col justify-center relative z-10">
        <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/40 relative animate-fade-in">
          
          {/* Back button & Step Progress if inside wizard */}
          {showBack && (
            <div className="mb-4">
              <button
                type="button"
                onClick={handleDefaultBack}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-indigo-300 transition-colors py-1 px-2 -ml-2 rounded-lg hover:bg-slate-800/50"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          )}

          {currentStep && (
            <div className="mb-6">
              <ProgressIndicator currentStep={currentStep} totalSteps={4} />
            </div>
          )}

          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-6 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 NubPack Inc. Frontend Engineering Assessment replication. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WizardLayout;
