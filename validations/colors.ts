export interface ColorsError {
  name?: string;
  hex?: string;
}

export const colorsValidate = (
  name: string,
  hex: string,
  setErrors: (errors: ColorsError) => void
): boolean => {
  const newErrors: ColorsError = {};
  if (!name.trim()) newErrors.name = "Please enter color name";
  if (!hex.trim()) newErrors.hex = "Please select a color";
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
