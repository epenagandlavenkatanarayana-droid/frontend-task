import { validateEmail } from './validation';

/**
 * Helper to simulate network latency with Promise
 */
const delay = (ms = 1200) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock Email Verification API
 */
export const mockVerifyEmail = async (email) => {
  await delay(1200);
  
  if (!email || !validateEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  // Simulate success
  return {
    success: true,
    message: 'OTP sent successfully to ' + email,
    email: email.trim()
  };
};

/**
 * Mock OTP Verification API
 * Mock successful OTP is "123456"
 */
export const mockVerifyOtp = async (otp) => {
  await delay(1200);
  
  const cleanOtp = String(otp).trim();
  if (cleanOtp !== '123456') {
    throw new Error('Incorrect OTP. Please enter 123456 to test.');
  }

  return {
    success: true,
    message: 'OTP verified successfully.'
  };
};

/**
 * Mock Resend OTP API
 */
export const mockResendOtp = async (email) => {
  await delay(1000);
  return {
    success: true,
    message: `A new 6-digit OTP code has been sent to ${email}`
  };
};

/**
 * Mock Save Profile Final API
 */
export const mockSaveProfile = async (profileData) => {
  await delay(1500);
  
  // Basic validation sanity check
  if (!profileData || !profileData.email) {
    throw new Error('Invalid profile session data. Please restart the wizard.');
  }

  return {
    success: true,
    profileId: 'NUB-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString(),
    message: 'Profile created successfully!'
  };
};
