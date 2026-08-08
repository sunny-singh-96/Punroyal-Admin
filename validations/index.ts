// lib/validation/index.ts - Validation utilities
export interface ValidationErrorMap {
  [key: string]: string | undefined;
}

export class ValidationError extends Error {
  constructor(public errors: ValidationErrorMap) {
    super('Validation failed');
  }
}

export const validateRequired = (value: any, fieldName: string): string | undefined => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email address';
  }
  return undefined;
};

export const validateMinLength = (value: string, min: number, fieldName: string): string | undefined => {
  if (value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return undefined;
};

export const validateMaxLength = (value: string, max: number, fieldName: string): string | undefined => {
  if (value.length > max) {
    return `${fieldName} must be at most ${max} characters`;
  }
  return undefined;
};

export const validatePattern = (value: string, pattern: RegExp, fieldName: string): string | undefined => {
  if (!pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }
  return undefined;
};

export const validateNumber = (value: any, fieldName: string): string | undefined => {
  if (isNaN(value) || value === '' || value === null) {
    return `${fieldName} must be a number`;
  }
  return undefined;
};
