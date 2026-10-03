import { CategoryError } from "@/types/types";

export const categoryValidate = (
    title: string,
    image: string,
    imageFile: File | null,
    setErrors: (errors: CategoryError) => void
): boolean => {
    const newErrors: CategoryError = {};
    if (!title.trim()) newErrors.title = "Category title is required";
    // Image is optional
    if (image && !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('data:')) {
        newErrors.image = "Image must be a valid URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
