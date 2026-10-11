export type CouponFormErrors = {
  couponName?: string;
  expiryType?: string;
  expiryDate?: string;
  count?: string;
};

export type CouponFormData = {
  couponName: string;
  expiryType: 'expiry_date' | 'no_expiry';
  expiryDate: string;
  count: number;
};

export const couponValidate = (
  formData: CouponFormData,
  setErrors: (errors: CouponFormErrors) => void,
  isEdit = false
): boolean => {
  const newErrors: CouponFormErrors = {};
  const name = formData.couponName.trim();

  if (!name) {
    newErrors.couponName = 'Coupon name is required';
  } else if (name.length < 2) {
    newErrors.couponName = 'Coupon name must be at least 2 characters';
  } else if (name.length > 64) {
    newErrors.couponName = 'Coupon name must be 64 characters or fewer';
  } else if (!/^[A-Za-z0-9_-]+$/.test(name)) {
    newErrors.couponName = 'Use letters, numbers, hyphens and underscores only';
  }

  if (!formData.expiryType) {
    newErrors.expiryType = 'Expiry type is required';
  }

  if (formData.expiryType === 'expiry_date') {
    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required when Expiry Date is selected';
    } else {
      const selected = new Date(formData.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(selected.getTime())) {
        newErrors.expiryDate = 'Enter a valid expiry date';
      } else if (!isEdit && selected <= today) {
        newErrors.expiryDate = 'Expiry date must be in the future';
      }
    }
  }

  if (!Number.isFinite(formData.count) || formData.count < 1) {
    newErrors.count = 'Count must be at least 1';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
