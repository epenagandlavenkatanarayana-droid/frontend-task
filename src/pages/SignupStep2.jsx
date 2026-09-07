import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Phone, AtSign, Mail, ArrowRight } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { validateEmail, sanitizeNumeric } from '../utils/validation';
import WizardLayout from '../components/wizard/WizardLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignupStep2 = () => {
  const navigate = useNavigate();
  const { step2, updateStepData } = useSignup();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phone: step2.phone || '',
      username: step2.username || '',
      altEmail: step2.altEmail || ''
    }
  });

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const clean = sanitizeNumeric(raw).slice(0, 10);
    setValue('phone', clean, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      updateStepData(2, {
        phone: data.phone,
        username: data.username.trim(),
        altEmail: data.altEmail ? data.altEmail.trim() : ''
      });
      setIsLoading(false);
      navigate('/signup/step-3');
    }, 600);
  };

  return (
    <WizardLayout currentStep={2} showBack onBack={() => navigate('/signup/step-1')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Contact & Account Details
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Provide your contact number and choose a unique username.
          </p>
        </div>

        {/* Mobile Phone Number */}
        <Input
          label="Phone Number (10 digits)"
          type="tel"
          placeholder="9876543210"
          icon={Phone}
          required
          maxLength={10}
          helperText="Numeric characters only. 10 digits required."
          error={errors.phone?.message}
          {...register('phone', {
            required: 'Phone number is required',
            onChange: handlePhoneChange,
            validate: (val) => {
              const digits = sanitizeNumeric(val);
              if (digits.length !== 10) return 'Phone number must be exactly 10 digits';
              return true;
            }
          })}
        />

        {/* Username */}
        <Input
          label="Unique Username"
          placeholder="pro_player99"
          icon={AtSign}
          required
          error={errors.username?.message}
          {...register('username', {
            required: 'Username is required',
            minLength: { value: 4, message: 'Username must be at least 4 characters' },
            maxLength: { value: 20, message: 'Username cannot exceed 20 characters' },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username can only contain letters, numbers, and underscores'
            }
          })}
        />

        {/* Alternate Email (Optional) */}
        <Input
          label="Alternate Email (Optional)"
          type="email"
          placeholder="backup@example.com"
          icon={Mail}
          error={errors.altEmail?.message}
          {...register('altEmail', {
            validate: (val) => {
              if (!val || val.trim() === '') return true;
              return validateEmail(val.trim()) || 'Please enter a valid alternate email format.';
            }
          })}
        />

        {/* Continue Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          icon={ArrowRight}
        >
          Continue to Step 3
        </Button>
      </form>
    </WizardLayout>
  );
};

export default SignupStep2;
