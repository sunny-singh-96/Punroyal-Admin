import { Dispatch, SetStateAction } from "react";

// ---------------- FORM TYPE ----------------
export interface ProductFormData {
  title: string;
  display_price: number;
  price: number;
  quantity: number;
  product_type: "sizes" | "no_sizes" | "";
  description: string;
  specifications: string;
  cat_id: string;
  cat_ids?: string[];
  status: boolean;
  video: File[];
  video_link: string;
  model_id: string;
  influencer_id?: string;
  metarial: {
    id: string;
  }[];
  weight?: number;
  commission?: number;
  commission_type?: "percentage" | "flat" | "";
  type?: number;
  variants: {
    color_id: string;
    size_id: string;
    quantity: number;
  }[];
}

// ---------------- ERROR TYPE ----------------
// ✅ BEST PRACTICE (auto sync with form)
export type ProductError = Partial<Record<keyof ProductFormData, string>>;

// ---------------- VALIDATOR ----------------
export const productValidate = (
  form: ProductFormData,
  setErrors: Dispatch<SetStateAction<ProductError>>
): boolean => {
  const newErrors: ProductError = {};
  // -------- BASIC --------
  if (!form.title.trim()) {
    newErrors.title = "Product title is required";
  }
  if (!form.product_type) {
    newErrors.product_type = "Product type is required";
  }
  if (!form.price || form.price <= 0) {
    newErrors.price = "Price must be greater than 0";
  }
  if (!form.display_price || form.display_price <= 0) {
    newErrors.display_price = "Display price must be greater than 0";
  }
  const hasCategory = (form.cat_ids && form.cat_ids.length > 0) || Boolean(form.cat_id && form.cat_id.trim());
  if (!hasCategory) {
    newErrors.cat_id = "Please select at least one category";
  }
  if (!form.description.trim()) {
    newErrors.description = "Description is required";
  }
  if (!form.specifications.trim()) {
    newErrors.specifications = "Specifications are required";
  }
  if (form.product_type === "no_sizes") {
    const qty = Number(form.quantity);
    if (!form.quantity || isNaN(qty) || qty < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }
  }
  if (form.weight !== undefined && form.weight !== null) {
    const wt = Number(form.weight);
    if (!form.weight || isNaN(wt) || wt < 1) {
      newErrors.weight = "Weight must be at least 1 kg";
    }
  }
  if (form.video_link && !form.video_link.startsWith("http")) {
    newErrors.video_link = "Video link must be a valid URL";
  }
  setErrors(newErrors);
  console.log("Validation errors:", newErrors);
  return Object.keys(newErrors).length === 0;
};