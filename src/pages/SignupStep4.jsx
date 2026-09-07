import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Sparkles, Gamepad2, Code2, Palette, BrainCircuit, Tv, CheckCircle2 } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { PRIMARY_INTERESTS, EXPERIENCE_LEVELS } from '../data/education';
import { mockSaveProfile } from '../utils/mockApi';
import WizardLayout from '../components/wizard/WizardLayout';
import Select from '../components/common/Select';
import Checkbox from '../components/common/Checkbox';
import Button from '../components/common/Button';

const iconMap = {
  Gamepad2,
  Code2,
  Palette,
  BrainCircuit,
  Tv
};

const SignupStep4 = () => {
  const navigate = useNavigate();
  const signupContext = useSignup();
  const { step4, updateStepData, setCompleted, showToast } = signupContext;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      primaryInterest: step4.primaryInterest || 'gaming',
      experienceLevel: step4.experienceLevel || 'intermediate',
      notifications: step4.notifications !== undefined ? step4.notifications : true,
      bio: step4.bio || ''
    }
  });

  const bioText = watch('bio') || '';
  const charCount = bioText.length;
  const maxChars = 250;

  const onSubmit = async (data) => {
    setIsLoading(true);

    const fullProfileData = {
      email: signupContext.email,
      termsAccepted: signupContext.termsAccepted,
      step1: signupContext.step1,
      step2: signupContext.step2,
      step3: signupContext.step3,
      step4: data
    };

    try {
      updateStepData(4, data);
      await mockSaveProfile(fullProfileData);
      setCompleted(true);
      showToast('Profile created successfully!', 'success');
      navigate('/signup/success');
    } catch (err) {
      showToast(err.message || 'Failed to save profile. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WizardLayout currentStep={4} showBack onBack={() => navigate('/signup/step-3')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Preferences & Bio
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Customize your interest tags and share a brief bio.
          </p>
        </div>

        {/* Primary Interest Cards */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
            Primary Interest <span className="text-indigo-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRIMARY_INTERESTS.map((item) => {
              const IconComp = iconMap[item.icon] || Sparkles;
              return (
                <label
                  key={item.value}
                  className="relative flex items-center gap-3 p-3 rounded-xl border border-slate-700/60 glass-input cursor-pointer hover:border-indigo-500 transition-all text-xs font-medium text-slate-200 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-500/20 has-[:checked]:text-indigo-300"
                >
                  <input
                    type="radio"
                    value={item.value}
                    className="sr-only"
                    {...register('primaryInterest', { required: 'Please select an interest' })}
                  />
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Experience Level */}
        <Select
          label="Experience Level"
          placeholder="Select experience level..."
          icon={Sparkles}
          required
          options={EXPERIENCE_LEVELS}
          error={errors.experienceLevel?.message}
          {...register('experienceLevel', {
            required: 'Please select experience level'
          })}
        />

        {/* Profile Bio */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="bio" className="text-xs font-semibold tracking-wide text-slate-300 uppercase">
              Short Bio (Optional)
            </label>
            <span className={`text-xs font-mono ${charCount > maxChars ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
              {charCount}/{maxChars}
            </span>
          </div>
          <textarea
            id="bio"
            rows={3}
            maxLength={maxChars}
            placeholder="Tell the community a little about your goals or achievements..."
            className="w-full rounded-xl text-sm text-slate-100 placeholder-slate-500 glass-input p-3 transition-all outline-none resize-none border-slate-700/60 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
            {...register('bio', {
              maxLength: { value: maxChars, message: `Bio cannot exceed ${maxChars} characters` }
            })}
          />
          {errors.bio && (
            <p className="text-xs font-medium text-rose-400">{errors.bio.message}</p>
          )}
        </div>

        {/* Notification Opt-in */}
        <Checkbox
          label="Receive NubPack updates, news, and community notifications"
          {...register('notifications')}
        />

        {/* Final Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          icon={CheckCircle2}
        >
          Complete Profile Registration
        </Button>
      </form>
    </WizardLayout>
  );
};

export default SignupStep4;
