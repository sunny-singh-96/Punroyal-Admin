export interface MaterialsError {
  name?: string;
}

export const materialsValidate = (
  name: string,
  setErrors: (errors: MaterialsError) => void
): boolean => {
  const newErrors: MaterialsError = {};
  if (!name.trim()) newErrors.name = "Please enter material name";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
