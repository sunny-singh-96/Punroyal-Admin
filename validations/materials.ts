export interface SizesError {
  name?: string;
}

export const sizesValidate = (
  name: string,
  setErrors: (errors: SizesError) => void
): boolean => {
  const newErrors: SizesError = {};
  if (!name.trim()) newErrors.name = "Please enter size name";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
