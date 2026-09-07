import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSignup } from '../../context/SignupContext';

const ProtectedWizardRoute = ({ children, requiredState }) => {
  const { termsAccepted, email, otpVerified, currentCompletedStep, isCompleted } = useSignup();

  if (requiredState === 'terms' && !termsAccepted) {
    return <Navigate to="/terms" replace />;
  }

  if (requiredState === 'email' && !email) {
    return <Navigate to="/signup/email" replace />;
  }

  if (requiredState === 'otp' && !otpVerified) {
    return <Navigate to="/signup/otp" replace />;
  }

  if (requiredState === 'step1' && !otpVerified) {
    return <Navigate to="/signup/otp" replace />;
  }

  if (requiredState === 'step2' && currentCompletedStep < 1) {
    return <Navigate to="/signup/step-1" replace />;
  }

  if (requiredState === 'step3' && currentCompletedStep < 2) {
    return <Navigate to="/signup/step-2" replace />;
  }

  if (requiredState === 'step4' && currentCompletedStep < 3) {
    return <Navigate to="/signup/step-3" replace />;
  }

  if (requiredState === 'success' && currentCompletedStep < 4 && !isCompleted) {
    return <Navigate to="/signup/step-4" replace />;
  }

  return children;
};

export default ProtectedWizardRoute;
