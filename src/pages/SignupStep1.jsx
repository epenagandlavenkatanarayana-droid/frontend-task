import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Calendar, ArrowRight } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { calculateAge, isAdult } from '../utils/validation';
import WizardLayout from '../components/wizard/WizardLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignupStep1 = () => {
  const navigate = useNavigate();
  const { step1, updateStepData, showToast } = useSignup();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: step1.firstName || '',
      lastName: step1.lastName || '',
      gender: step1.gender || 'male',
      dateOfBirth: step1.dateOfBirth || ''
    }
  });

  const selectedDob = watch('dateOfBirth');
  const calculatedAge = selectedDob ? calculateAge(selectedDob) : null;

  const onSubmit = async (data) => {
    // Validate age requirement strictly >= 18
    if (!data.dateOfBirth || !isAdult(data.dateOfBirth)) {
      setError('dateOfBirth', {
        type: 'manual',
        message: 'You must be 18 or older to continue.'
      });
      showToast('You must be 18 or older to register.', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate brief processing
    setTimeout(() => {
      updateStepData(1, {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        gender: data.gender,
        dateOfBirth: data.dateOfBirth
      });
      setIsLoading(false);
      navigate('/signup/step-2');
    }, 600);
  };

  return (
    <WizardLayout currentStep={1} showBack onBack={() => navigate('/signup/otp')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Personal Information
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tell us about yourself to customize your NubPack experience.
          </p>
        </div>

        {/* First & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            icon={User}
            required
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Must be at least 2 characters' },
              validate: (val) => val.trim().length > 0 || 'Whitespace only not allowed'
            })}
          />

          <Input
            label="Last Name"
            placeholder="Doe"
            icon={User}
            required
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Must be at least 2 characters' },
              validate: (val) => val.trim().length > 0 || 'Whitespace only not allowed'
            })}
          />
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
            Gender <span className="text-indigo-400">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'male', label: 'Male' },
              { id: 'female', label: 'Female' },
              { id: 'non-binary', label: 'Non-Binary' },
              { id: 'other', label: 'Prefer not to say' }
            ].map((g) => (
              <label
                key={g.id}
                className="relative flex items-center justify-center p-2.5 rounded-xl border border-slate-700/60 glass-input cursor-pointer hover:border-indigo-500 transition-all text-xs font-medium text-slate-200 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-500/20 has-[:checked]:text-indigo-300"
              >
                <input
                  type="radio"
                  value={g.id}
                  className="sr-only"
                  {...register('gender', { required: 'Please select a gender' })}
                />
                <span>{g.label}</span>
              </label>
            ))}
          </div>
          {errors.gender && (
            <p className="text-xs font-medium text-rose-400 mt-1">{errors.gender.message}</p>
          )}
        </div>

        {/* Date of Birth & Age validation */}
        <div className="flex flex-col gap-1.5">
          <Input
            label="Date of Birth"
            type="date"
            icon={Calendar}
            required
            helperText={
              calculatedAge !== null
                ? `Calculated Age: ${calculatedAge} years old`
                : 'Must be 18 years or older'
            }
            error={errors.dateOfBirth?.message}
            {...register('dateOfBirth', {
              required: 'Date of birth is required',
              validate: (val) => {
                if (!val) return 'Date of birth is required';
                if (!isAdult(val)) return 'You must be 18 or older to continue.';
                return true;
              }
            })}
          />
        </div>

        {/* Continue Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          icon={ArrowRight}
        >
          Continue to Step 2
        </Button>
      </form>
    </WizardLayout>
  );
};

export default SignupStep1;
