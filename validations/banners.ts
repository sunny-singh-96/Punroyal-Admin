import { BannerError } from '@/types/types';

export const bannerValidate = (
  title: string,
  image: string,
  imageFile: File | null,
  setErrors: (errors: BannerError) => void,
  redirect_to?: string,
): boolean => {
  const newErrors: BannerError = {};
  
  // Title is optional if redirect_to or image is provided, but recommended
  if (!title.trim() && !redirect_to?.trim() && !image && !imageFile) {
    newErrors.title = 'Banner title or Link URL is required';
  }

  // Banner image is completely OPTIONAL
  if (image && !image.startsWith('http') && !image.startsWith('/') && !image.startsWith('data:')) {
    newErrors.banner = 'Image must be a valid URL or path';
    newErrors.image = 'Image must be a valid URL or path';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
