export interface ModelsError {
  name?: string;
}

export const modelsValidate = (
  name: string,
  setErrors: (errors: ModelsError) => void
): boolean => {
  const newErrors: ModelsError = {};
  if (!name.trim()) newErrors.name = "Please enter model name";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
