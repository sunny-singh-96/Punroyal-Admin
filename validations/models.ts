export interface ModelsError {
  name?: string;
  password?: string;
}

export const modelsValidate = (
  name: string,
  password: string | undefined,
  setErrors: (errors: ModelsError) => void
): boolean => {
  const newErrors: ModelsError = {};
  if (!name.trim()) newErrors.name = "Please enter influencer name";
  if (!password || password.length < 6) newErrors.password = "Password must be at least 6 characters";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
