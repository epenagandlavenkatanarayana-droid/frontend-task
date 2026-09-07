import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FileText, ArrowRight } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import WizardLayout from '../components/wizard/WizardLayout';
import Checkbox from '../components/common/Checkbox';
import Button from '../components/common/Button';

const TermsPage = () => {
  const navigate = useNavigate();
  const { termsAccepted, setTermsAccepted } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      accepted: termsAccepted
    }
  });

  const isChecked = watch('accepted');

  const onSubmit = (data) => {
    if (data.accepted) {
      setTermsAccepted(true);
      navigate('/signup/email');
    }
  };

  return (
    <WizardLayout showBack onBack={() => navigate('/')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Terms & Conditions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Please read and accept the terms of service to continue your signup.
          </p>
        </div>

        {/* Scrollable Terms Content */}
        <div className="w-full max-h-56 overflow-y-auto pr-2 rounded-xl p-4 glass-input border border-slate-700/80 text-xs text-slate-300 leading-relaxed flex flex-col gap-3">
          <p className="font-semibold text-slate-200">Welcome to NubPack Pro Service.</p>
          <p>
            1. <strong>User Eligibility:</strong> By accessing and completing the registration wizard, you confirm that you are at least 18 years of age or the legal age of majority in your jurisdiction.
          </p>
          <p>
            2. <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account credentials, including OTP verification codes. You agree not to share your one-time passwords with third parties.
          </p>
          <p>
            3. <strong>Data Collection & Privacy:</strong> We collect essential profile information, including contact details, education, and user preferences to customize your NubPack application experience.
          </p>
          <p>
            4. <strong>Acceptable Use:</strong> Users must not engage in fraudulent, automated, or harmful activities on the platform. Any violation may result in immediate suspension.
          </p>
          <p>
            5. <strong>Service Availability:</strong> NubPack reserves the right to modify or discontinue features with prior notice.
          </p>
        </div>

        {/* Checkbox agreement */}
        <Checkbox
          label="I agree to the Terms & Conditions and Privacy Policy"
          error={errors.accepted?.message}
          {...register('accepted', {
            required: 'You must accept the Terms & Conditions to proceed'
          })}
        />

        {/* Action Buttons */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isDisabled={!isChecked}
          icon={ArrowRight}
        >
          Accept & Continue
        </Button>
      </form>
    </WizardLayout>
  );
};

export default TermsPage;
