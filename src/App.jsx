import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignupProvider } from './context/SignupContext';
import ProtectedWizardRoute from './components/wizard/ProtectedWizardRoute';
import Toast from './components/common/Toast';

import LandingPage from './pages/LandingPage';
import TermsPage from './pages/TermsPage';
import EmailPage from './pages/EmailPage';
import OtpPage from './pages/OtpPage';
import SignupStep1 from './pages/SignupStep1';
import SignupStep2 from './pages/SignupStep2';
import SignupStep3 from './pages/SignupStep3';
import SignupStep4 from './pages/SignupStep4';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <SignupProvider>
      <Router>
        <Toast />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          <Route
            path="/signup/email"
            element={
              <ProtectedWizardRoute requiredState="terms">
                <EmailPage />
              </ProtectedWizardRoute>
            }
          />

          <Route
            path="/signup/otp"
            element={
              <ProtectedWizardRoute requiredState="email">
                <OtpPage />
              </ProtectedWizardRoute>
            }
          />

          <Route
            path="/signup/step-1"
            element={
              <ProtectedWizardRoute requiredState="step1">
                <SignupStep1 />
              </ProtectedWizardRoute>
            }
          />

          <Route
            path="/signup/step-2"
            element={
              <ProtectedWizardRoute requiredState="step2">
                <SignupStep2 />
              </ProtectedWizardRoute>
            }
          />

          <Route
            path="/signup/step-3"
            element={
              <ProtectedWizardRoute requiredState="step3">
                <SignupStep3 />
              </ProtectedWizardRoute>
            }
          />

          <Route
            path="/signup/step-4"
            element={
              <ProtectedWizardRoute requiredState="step4">
                <SignupStep4 />
              </ProtectedWizardRoute>
            }
          />

          <Route
            path="/signup/success"
            element={
              <ProtectedWizardRoute requiredState="success">
                <SuccessPage />
              </ProtectedWizardRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SignupProvider>
  );
}

export default App;
