import { BannerError } from '@/types/types';

export const bannerValidate = (
  title: string,
  image: string,
  imageFile: File | null,
  setErrors: (errors: BannerError) => void,
): boolean => {
  const newErrors: BannerError = {};
  if (!title.trim()) newErrors.title = 'Banner title is required';
  if (!image && !imageFile) {
    newErrors.banner = 'Banner image is required';
    newErrors.image = 'Banner image is required';
  }
  if (image && !image.startsWith('http')) {
    newErrors.banner = 'Image must be a valid URL';
    newErrors.image = 'Image must be a valid URL';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
