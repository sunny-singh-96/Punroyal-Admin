import { OccasionsError } from "@/types/types";

export const occasionsValidate = (
    cat_id: string,
    setErrors: (errors: OccasionsError) => void
): boolean => {
    const newErrors: OccasionsError = {};
    if (!cat_id.trim()) newErrors.cat_id = "Please select category";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};