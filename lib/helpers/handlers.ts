import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  const err = error as AxiosError<{ error?: string }>;
  return (
    err.response?.data?.error ||
    err.message ||
    "An error occurred"
  );
};