import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, User, Mail, MapPin, GraduationCap, Sparkles, RotateCcw } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import WizardLayout from '../components/wizard/WizardLayout';
import Button from '../components/common/Button';

const SuccessPage = () => {
  const navigate = useNavigate();
  const signup = useSignup();
  const { email, step1, step2, step3, step4, resetWizard } = signup;

  const handleStartNew = () => {
    resetWizard();
    navigate('/');
  };

  return (
    <WizardLayout>
      <div className="flex flex-col items-center text-center gap-6 py-4 animate-fade-in">
        {/* Animated Celebration Icon */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 border border-emerald-400/40 relative z-10">
            <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Setup Complete</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Profile Completed!
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Welcome aboard! Your NubPack Pro account profile has been successfully configured and saved.
          </p>
        </div>

        {/* Profile Details Summary Box */}
        <div className="w-full rounded-2xl p-4 sm:p-5 glass-input border border-slate-700/70 text-left flex flex-col gap-3.5 text-xs text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="font-semibold text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Account Status
            </span>
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold uppercase text-[10px]">
              Verified Pro
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                <strong className="text-slate-200">Name:</strong> {step1.firstName || 'User'} {step1.lastName || ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                <strong className="text-slate-200">Email:</strong> {email || 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                <strong className="text-slate-200">Username:</strong> @{step2.username || 'user'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                <strong className="text-slate-200">Location:</strong> {step3.city}, {step3.state}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:col-span-2">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                <strong className="text-slate-200">Education:</strong> {step3.institution}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              alert('Redirecting to NubPack Pro Main Dashboard...');
            }}
          >
            Go to Dashboard
          </Button>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleStartNew}
            icon={RotateCcw}
          >
            Start New Wizard
          </Button>
        </div>
      </div>
    </WizardLayout>
  );
};

export default SuccessPage;
