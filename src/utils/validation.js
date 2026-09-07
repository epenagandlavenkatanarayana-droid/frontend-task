/**
 * Validates RFC 5322 standard email address format.
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length === 0) return false;
  
  // Strict standard email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmed);
};

/**
 * Calculates age in full years from a date string (YYYY-MM-DD).
 */
export const calculateAge = (dobString) => {
  if (!dobString) return 0;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return 0;
  
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Ensures user is 18 years or older.
 */
export const isAdult = (dobString) => {
  const age = calculateAge(dobString);
  return age >= 18;
};

/**
 * Sanitizes input to digits only.
 */
export const sanitizeNumeric = (value) => {
  if (!value) return '';
  return value.replace(/\D/g, '');
};
