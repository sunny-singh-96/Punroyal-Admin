import { Dispatch, SetStateAction } from "react";

// ---------------- FORM TYPE ----------------
export interface ProductFormData {
  title: string;
  display_price: number;
  price: number;
  quantity: number;
  product_type: "sizes" | "no_sizes";
  description: string;
  specifications: string;
  cat_id: string;
  status: boolean;
  video: File[];
  video_link: string;
  model_id: string;
  metarial: {
    id: string;
  }[];
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
  if (!form.cat_id) {
    newErrors.cat_id = "Category is required";
  }
  if (!form.description.trim()) {
    newErrors.description = "Description is required";
  }
  if (!form.specifications.trim()) {
    newErrors.specifications = "Specifications are required";
  }
  if (!form.model_id) {
    newErrors.model_id = "At least one model is required";
  }
  if (form.video.length === 0) {
    newErrors.video = "Video is required";
  }
  if (form.video_link && !form.video_link.startsWith("http")) {
    newErrors.video_link = "Video link must be a valid URL";
  }
  if (!form.metarial || form.metarial.length === 0) {
    newErrors.metarial = "At least one material is required";
  }
  setErrors(newErrors);
  console.log("Validation errors:", newErrors);
  return Object.keys(newErrors).length === 0;
};