import { LoginErrors } from "@/types/types";

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return re.test(email);
};

export const adminLogin = (
  email: string,
  password: string,
  setErrors: (errors: LoginErrors) => void
): boolean => {
  const newErrors: LoginErrors = {};
  if (!email || !email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(email)) {
    newErrors.email = "Invalid email address";
  }
  if (!password || !password.trim()) {
    newErrors.password = "Password is required";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const influencerLoginValidation = (
  identifier: string,
  password: string,
  setErrors: (errors: LoginErrors) => void
): boolean => {
  const newErrors: LoginErrors = {};
  if (!identifier || !identifier.trim()) {
    newErrors.identifier = "Username or Email is required";
  }
  if (!password || !password.trim()) {
    newErrors.password = "Password is required";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const influencerRegisterValidation = (
  data: { name: string; email: string; password: string; phone?: string },
  setErrors: (errors: LoginErrors) => void
): boolean => {
  const newErrors: LoginErrors = {};
  if (!data.name || !data.name.trim()) {
    newErrors.name = "Name is required";
  }
  if (!data.email || !data.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    newErrors.email = "Invalid email address";
  }
  if (!data.password || !data.password.trim()) {
    newErrors.password = "Password is required";
  } else if (data.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};