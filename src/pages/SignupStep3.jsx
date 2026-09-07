import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { useSignup } from '../context/SignupContext';
import { LOCATION_DATA } from '../data/locations';
import { EDUCATION_LEVELS, INSTITUTION_OPTIONS } from '../data/education';
import WizardLayout from '../components/wizard/WizardLayout';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const SignupStep3 = () => {
  const navigate = useNavigate();
  const { step3, updateStepData } = useSignup();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      state: step3.state || '',
      city: step3.city || '',
      educationLevel: step3.educationLevel || '',
      institution: step3.institution || ''
    }
  });

  const selectedState = watch('state');
  const selectedEduLevel = watch('educationLevel');

  // Find available cities for selected state
  const stateObj = LOCATION_DATA.find((item) => item.state === selectedState);
  const cityOptions = stateObj ? stateObj.cities : [];

  // Find institution options based on education level
  const institutionOptions = selectedEduLevel ? INSTITUTION_OPTIONS[selectedEduLevel] || [] : [];

  // Dependent field logic: Reset city whenever state changes if city is no longer valid
  useEffect(() => {
    if (selectedState) {
      const currentCity = watch('city');
      if (currentCity && !cityOptions.includes(currentCity)) {
        setValue('city', '', { shouldValidate: true });
      }
    } else {
      setValue('city', '');
    }
  }, [selectedState, cityOptions, setValue, watch]);

  // Dependent field logic: Reset institution when education level changes
  useEffect(() => {
    if (selectedEduLevel) {
      const currentInst = watch('institution');
      if (currentInst && !institutionOptions.includes(currentInst)) {
        setValue('institution', '', { shouldValidate: true });
      }
    } else {
      setValue('institution', '');
    }
  }, [selectedEduLevel, institutionOptions, setValue, watch]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setTimeout(() => {
      updateStepData(3, {
        state: data.state,
        city: data.city,
        educationLevel: data.educationLevel,
        institution: data.institution
      });
      setIsLoading(false);
      navigate('/signup/step-4');
    }, 600);
  };

  return (
    <WizardLayout currentStep={3} showBack onBack={() => navigate('/signup/step-2')}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Education & Location
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Select your primary region and academic background.
          </p>
        </div>

        {/* State Dropdown */}
        <Select
          label="State / Province"
          placeholder="Select state..."
          icon={MapPin}
          required
          options={LOCATION_DATA.map((item) => item.state)}
          error={errors.state?.message}
          {...register('state', {
            required: 'Please select a state'
          })}
        />

        {/* Dependent City Dropdown */}
        <Select
          label="City"
          placeholder={selectedState ? 'Select city...' : 'First select a state'}
          icon={MapPin}
          required
          disabled={!selectedState}
          options={cityOptions}
          helperText={!selectedState ? 'Select a state above to enable city selection.' : undefined}
          error={errors.city?.message}
          {...register('city', {
            required: 'Please select a city'
          })}
        />

        {/* Highest Education Level */}
        <Select
          label="Highest Education Level"
          placeholder="Select education level..."
          icon={GraduationCap}
          required
          options={EDUCATION_LEVELS}
          error={errors.educationLevel?.message}
          {...register('educationLevel', {
            required: 'Please select your education level'
          })}
        />

        {/* Institution Dropdown / Text */}
        <Select
          label="College / Institution Name"
          placeholder={selectedEduLevel ? 'Select institution...' : 'First select education level'}
          icon={Building2}
          required
          disabled={!selectedEduLevel}
          options={institutionOptions}
          error={errors.institution?.message}
          {...register('institution', {
            required: 'Please select or enter your institution'
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
          Continue to Step 4
        </Button>
      </form>
    </WizardLayout>
  );
};

export default SignupStep3;
