import { CategoryError } from "@/types/types";

export const categoryValidate = (
    title: string,
    image: string,
    imageFile: File | null,
    setErrors: (errors: CategoryError) => void
): boolean => {
    const newErrors: CategoryError = {};
    if (!title.trim()) newErrors.title = "Category is required";
    if (!image && !imageFile) {
        newErrors.image = "Image is required";
    }
    if (image && !image.startsWith('http') && !image.startsWith('/')) {
        newErrors.image = "Image must be a valid URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
