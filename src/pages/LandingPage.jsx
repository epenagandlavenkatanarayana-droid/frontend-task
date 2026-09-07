import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Lock, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic ambient lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Navigation Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-wider text-white">NUBPACK</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/terms')}>
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center text-center relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Next Generation NubPack Pro Wizard</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mb-6">
          Elevate Your Performance with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">NubPack Pro</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Complete your customized pro profile in under 2 minutes. Secure OTP authentication, instant setup, and zero friction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mb-16">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/terms')}
            className="group"
          >
            <span>Start Profile Setup</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Instant Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamless 6-digit OTP authentication with automatic input focus and paste support.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Secure & Private</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              State-of-the-art client validation enforcing age requirements ($\ge 18$) and numeric constraints.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Smart Auto-Save</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Never lose your progress. Complete form values are automatically synchronized in real-time.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs text-slate-500 relative z-10 border-t border-slate-900">
        <p>© 2026 NubPack Application Assessment. Production Frontend Replication.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
