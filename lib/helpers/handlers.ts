import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  const err = error as AxiosError<{ error?: string; message?: string }>;
  return (
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.message ||
    "An error occurred"
  );
};
