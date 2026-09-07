import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, ArrowRight } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { mockVerifyEmail } from '../utils/mockApi';
import { validateEmail } from '../utils/validation';
import WizardLayout from '../components/wizard/WizardLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const EmailPage = () => {
  const navigate = useNavigate();
  const { email, setEmail, showToast } = useSignup();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: email || ''
    }
  });

  const onSubmit = async (data) => {
    const trimmedEmail = data.email.trim();

    if (!trimmedEmail || !validateEmail(trimmedEmail)) {
      setError('email', {
        type: 'manual',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await mockVerifyEmail(trimmedEmail);
      setEmail(res.email);
      showToast('OTP code sent to your email!', 'success');
      navigate('/signup/otp');
    } catch (err) {
      setError('email', {
        type: 'manual',
        message: err.message || 'Unable to send OTP. Please try again.'
      });
      showToast(err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WizardLayout showBack onBack={() => navigate('/terms')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Authentication</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Enter Your Email
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            We will send a 6-digit verification OTP code to your email address.
          </p>
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          icon={Mail}
          required
          autoFocus
          error={errors.email?.message}
          {...register('email', {
            required: 'Email address is required',
            validate: (value) => {
              const trimmed = value.trim();
              if (!trimmed) return 'Email cannot be empty or whitespace only';
              if (!validateEmail(trimmed)) return 'Please enter a valid email address.';
              return true;
            }
          })}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          icon={ArrowRight}
        >
          Send OTP Code
        </Button>
      </form>
    </WizardLayout>
  );
};

export default EmailPage;
