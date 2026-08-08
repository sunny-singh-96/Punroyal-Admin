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