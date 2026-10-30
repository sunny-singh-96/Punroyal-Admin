export type CouponFormErrors = {
  couponName?: string;
  discountType?: string;
  discountValue?: string;
  minOrderAmount?: string;
  maxDiscount?: string;
  startDate?: string;
  expiryType?: string;
  expiryDate?: string;
  count?: string;
  usageLimitPerUser?: string;
};

export type CouponFormData = {
  couponName: string;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number;
  startDate: string;
  expiryType: 'expiry_date' | 'no_expiry';
  expiryDate: string;
  count: number;
  usageLimitPerUser: number;
  status: boolean;
};

export const couponValidate = (
  formData: CouponFormData,
  setErrors: (errors: CouponFormErrors) => void,
  isEdit = false
): boolean => {
  const newErrors: CouponFormErrors = {};
  const name = formData.couponName.trim();

  if (!name) {
    newErrors.couponName = 'Coupon code/name is required';
  } else if (name.length < 2) {
    newErrors.couponName = 'Coupon name must be at least 2 characters';
  } else if (name.length > 64) {
    newErrors.couponName = 'Coupon name must be 64 characters or fewer';
  } else if (!/^[A-Za-z0-9_-]+$/.test(name)) {
    newErrors.couponName = 'Use letters, numbers, hyphens and underscores only';
  }

  if (!formData.discountType) {
    newErrors.discountType = 'Select discount type';
  }

  if (formData.discountValue === undefined || formData.discountValue === null || Number(formData.discountValue) <= 0) {
    newErrors.discountValue = 'Discount value must be greater than 0';
  } else if (formData.discountType === 'percentage' && Number(formData.discountValue) > 100) {
    newErrors.discountValue = 'Percentage discount cannot exceed 100%';
  }

  if (formData.minOrderAmount < 0) {
    newErrors.minOrderAmount = 'Minimum order amount cannot be negative';
  }

  if (formData.maxDiscount < 0) {
    newErrors.maxDiscount = 'Maximum discount cannot be negative';
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
      } else if (!isEdit && selected < today) {
        newErrors.expiryDate = 'Expiry date cannot be in the past';
      }
    }
  }

  if (!Number.isFinite(formData.count) || formData.count < 1) {
    newErrors.count = 'Total redemption count must be at least 1';
  }

  if (!Number.isFinite(formData.usageLimitPerUser) || formData.usageLimitPerUser < 1) {
    newErrors.usageLimitPerUser = 'Per customer limit must be at least 1';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
