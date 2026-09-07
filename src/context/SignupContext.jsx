import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'NUBPACK_WIZARD_PERSISTED_STATE_V1';

const initialWizardState = {
  termsAccepted: false,
  email: '',
  otpVerified: false,
  currentCompletedStep: 0, // 0 = none, 1 = step 1 done, 2 = step 2 done, etc.
  isCompleted: false,
  step1: {
    firstName: '',
    lastName: '',
    gender: 'male',
    dateOfBirth: ''
  },
  step2: {
    phone: '',
    username: '',
    altEmail: ''
  },
  step3: {
    state: '',
    city: '',
    educationLevel: '',
    institution: ''
  },
  step4: {
    primaryInterest: 'gaming',
    experienceLevel: 'intermediate',
    notifications: true,
    bio: ''
  }
};

const SignupContext = createContext(null);

export const SignupProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load stored wizard state from localStorage:', e);
    }
    return initialWizardState;
  });

  // Save to localStorage on state update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist wizard state to localStorage:', e);
    }
  }, [state]);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info', duration = 3500) => {
    setToast({ message, type, id: Date.now() });
  };

  const hideToast = () => {
    setToast(null);
  };

  const setTermsAccepted = (accepted) => {
    setState((prev) => ({ ...prev, termsAccepted: accepted }));
  };

  const setEmail = (email) => {
    setState((prev) => ({ ...prev, email }));
  };

  const setOtpVerified = (verified) => {
    setState((prev) => ({ ...prev, otpVerified: verified }));
  };

  const updateStepData = (stepNumber, data) => {
    setState((prev) => {
      const key = `step${stepNumber}`;
      const newStepCompleted = Math.max(prev.currentCompletedStep, stepNumber);
      return {
        ...prev,
        [key]: { ...prev[key], ...data },
        currentCompletedStep: newStepCompleted
      };
    });
  };

  const setCompleted = (completed = true) => {
    setState((prev) => ({
      ...prev,
      isCompleted: completed,
      currentCompletedStep: 4
    }));
  };

  const resetWizard = () => {
    setState(initialWizardState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
    showToast('Wizard progress reset.', 'info');
  };

  return (
    <SignupContext.Provider
      value={{
        ...state,
        setTermsAccepted,
        setEmail,
        setOtpVerified,
        updateStepData,
        setCompleted,
        resetWizard,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};
