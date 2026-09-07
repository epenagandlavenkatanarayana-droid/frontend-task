import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, RefreshCw, CheckCircle } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { mockVerifyOtp, mockResendOtp } from '../utils/mockApi';
import WizardLayout from '../components/wizard/WizardLayout';
import OtpInput from '../components/common/OtpInput';
import Button from '../components/common/Button';

const OtpPage = () => {
  const navigate = useNavigate();
  const { email, setOtpVerified, showToast } = useSignup();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(30);

  // 30-second countdown timer for Resend OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleVerify = async (e) => {
    if (e) e.preventDefault();

    if (otp.length < 6) {
      setError('Please enter the full 6-digit OTP code.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await mockVerifyOtp(otp);
      setOtpVerified(true);
      showToast('OTP verified successfully!', 'success');
      navigate('/signup/step-1');
    } catch (err) {
      setError(err.message || 'Incorrect OTP. Please try again.');
      showToast(err.message || 'Verification failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || isResending) return;

    setIsResending(true);
    try {
      await mockResendOtp(email);
      setTimer(30);
      setOtp('');
      setError('');
      showToast('A new OTP code has been sent to ' + email + ' (Use 123456)', 'info');
    } catch (err) {
      showToast('Failed to resend OTP. Try again.', 'error');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <WizardLayout showBack onBack={() => navigate('/signup/email')}>
      <form onSubmit={handleVerify} className="flex flex-col gap-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Verification</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Enter OTP Code
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sent to <span className="text-indigo-300 font-semibold">{email || 'your email'}</span>
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-[11px] text-indigo-300">
            <CheckCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Test Mock OTP: <strong>123456</strong></span>
          </div>
        </div>

        {/* OTP 6-box Input */}
        <OtpInput
          value={otp}
          onChange={(val) => {
            setOtp(val);
            if (error) setError('');
          }}
          length={6}
          error={error}
          isDisabled={isLoading}
        />

        {/* Verify Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          isDisabled={otp.length < 6}
        >
          Verify OTP
        </Button>

        {/* Resend OTP & Timer */}
        <div className="flex flex-col items-center gap-2 pt-2 border-t border-slate-800/80">
          <p className="text-xs text-slate-400">Didn't receive the code?</p>
          {timer > 0 ? (
            <span className="text-xs font-medium text-slate-400">
              Resend available in <strong className="text-indigo-400">{timer}s</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1 px-2 rounded-lg hover:bg-indigo-500/10"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
              <span>Resend OTP Code</span>
            </button>
          )}
        </div>
      </form>
    </WizardLayout>
  );
};

export default OtpPage;
