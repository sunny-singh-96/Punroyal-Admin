"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import toast from "react-hot-toast";
import { Loader2, AlertCircle, Save, Link } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { categoriesAPI, productsAPI, commonAPI, occasionsAPI } from "@/lib/integration";
import AsyncSelect from "@/components/admin/select/select";
import ColorVariantsSection from "@/components/admin/product/EditColorVariantsSection";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { productValidate } from "@/validations/product";
import { storageUtils } from "@/lib/storage";
interface ProductFormData {
  title: string;
  display_price: number;
  price: number;
  quantity: number;
  product_type: "sizes" | "no_sizes";
  description: string;
  specifications: string;
  cat_id: string;
  occasion_id?: string;
  status: boolean;
  video: File[];
  video_link: string;
  primaryColorId: string | null;
  isPrimary: boolean;
  model_id: string;
  influencer_id?: string;
  commission?: number;
  commission_type?: "percentage" | "flat";
  weight: number;
  height: number;
  breadth: number;
  length: number;
  metarial: {
    id: string;
  }[];
  media: {
    color_id: string;
    files: {
      file: File;
      file_id?: string | null;
      is_primary: number;
      role: string;
      sort_order?: number;
    }[];
  }[];
  variants: {
    color_id: string;
    size_id: string;
    quantity: number;
  }[];
}
export interface BaseItem {
  _id: string;
  name: string;
  status: string; // API gives "true" as string
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export interface ColorItem extends BaseItem {
  hex: string;
}
export interface CommonData {
  models: BaseItem[];
  materials: BaseItem[];
  sizes: BaseItem[];
  colors: ColorItem[];
}

type Material = { _id: string; name: string };

type VariantData = {
  primaryColorId: string | null;
  images: {
    color_id: string;
    files: {
      file?: File;
      file_id?: string | null; // ← ADD THIS: _id of the DB image being replaced
      role: string;
      is_primary: number;
      sort_order?: number;
    }[];
  }[];
  variants: {
    color_id: string;
    size_id: string;
    quantity: number;
  }[];
};

interface ProductImage {
  _id: string;
  url: string;
  color_id: string;
  file_ref: string;
  role: string;
  isPrimary: boolean;
  sortOrder: number;
  product_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type ApiVariant = {
  _id?: string;
  stock: number;
  color: { _id: string; name: string; hex: string };
  size: { _id: string; name: string };
};

type ApiMedia = {
  _id: string;
  url: string;
  color_id: string;
  isPrimary: boolean;
  color_name?: string;
};

/**
 * Calculates volumetric weight and applied (billable) weight based on actual weight and dimensions.
 * Formula:
 * Volumetric Weight (kg) = (Length * Breadth * Height) / 5000
 * Applied Weight (kg) = Math.max(Actual Weight, Volumetric Weight)
 * Note: Used only for frontend display to show total applied weight to user; NOT saved to database.
 */
export const calculateAppliedWeight = (
  weight: number | string = 0,
  length: number | string = 0,
  breadth: number | string = 0,
  height: number | string = 0
) => {
  const actualWeight = parseFloat(String(weight)) || 0;
  const l = parseFloat(String(length)) || 0;
  const b = parseFloat(String(breadth)) || 0;
  const h = parseFloat(String(height)) || 0;

  const volumetricWeight = Number(((l * b * h) / 5000).toFixed(3));
  const appliedWeight = Number(Math.max(actualWeight, volumetricWeight).toFixed(3));

  return {
    actualWeight,
    volumetricWeight,
    appliedWeight,
  };
};

// ---------- Component ----------
export default function CreateProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [colorVariantsValid, setColorVariantsValid] = useState(false);
  const [redirectTo, setRedirectTo] = useState("");
  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  const [common, setCommon] = useState<CommonData>({
    models: [],
    materials: [],
    sizes: [],
    colors: [],
  });

  const [variantData, setVariantData] = useState<VariantData>({
    primaryColorId: null,
    images: [],
    variants: [],
  });

  const [form, setForm] = useState<ProductFormData>({
    title: "",
    display_price: 0,
    price: 0,
    quantity: 0,
    product_type: "sizes",
    description: "",
    specifications: "",
    cat_id: "",
    occasion_id: "",
    status: true,
    video: [],
    video_link: "",
    primaryColorId: null,
    isPrimary: false,
    model_id: "",
    commission: 0,
    commission_type: "percentage",
    weight: 1,
    height: 0,
    breadth: 0,
    length: 0,
    metarial: [],
    variants: [],
    media: [],
  });
  interface ProductError {
    title?: string;
    display_price?: string;
    price?: string;
    quantity?: string;
    product_type?: string;
    description?: string;
    specifications?: string;
    cat_id?: string;
    video?: string;
    video_link?: string;
    model_id?: string;
    metarial?: string;
    variants?: string;
    weight?: string;
    height?: string;
    breadth?: string;
    length?: string;
    commission?: string;
    commission_type?: string;
    influencer_id?: string;
  }

  const [errors, setErrors] = useState<ProductError>({});

  const { volumetricWeight, appliedWeight } = useMemo(() => {
    return calculateAppliedWeight(
      form.weight,
      form.length,
      form.breadth,
      form.height
    );
  }, [form.weight, form.length, form.breadth, form.height]);

  const fetchProduct = useCallback(async (id: string) => {
    try {
      const response = await productsAPI.get(id);
      console.log("Fetch Product Response:", response);
      if (response?.code === "OK") {
        const product = response?.data?.product;
        const productImagesData = response?.data?.productImages || [];
        setProductImages(productImagesData);

        // ✅ FIX: Transform media for ColorVariantsSection
        const transformedMedia = productImagesData.map((img: ProductImage) => ({
          _id: img._id,
          url: img.url,
          color_id: img.color_id,
          isPrimary: img.isPrimary,
          color_name: "",
        }));

        setForm({
          title: product?.title || "",
          display_price: product?.display_price || 0,
          price: product?.price || 0,
          quantity: product?.quantity || 0,
          product_type: product?.product_type || "sizes",
          description: product?.description || "",
          specifications: product?.specifications || "",
          cat_id: product?.cat_id || "",
          occasion_id: product?.occasion_id || "",
          status: product?.status ?? true,
          video: product?.video ? [product.video] : [],
          video_link: product?.video_link || "",
          primaryColorId: product?.primaryColorId || null,
          isPrimary: product?.isPrimary || false,
          model_id: product?.influencer_id || product?.model?._id || product?.model_id || "",
          influencer_id: product?.influencer_id || product?.model?._id || product?.model_id || "",
          commission: product?.commission !== undefined && product?.commission !== null ? Number(product.commission) : 0,
          commission_type: (product?.commission_type || product?.commission_Type || "percentage") as "percentage" | "flat",
          metarial: product?.materials
            ? product.materials.map((m: Material) => ({
              id: m._id,
            }))
            : [],
          variants: product?.variants || [],
          media: transformedMedia,
          weight: product?.weight || 1,
          height: product?.height || 0,
          breadth: product?.breadth || 0,
          length: product?.length || 0,
        });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchCommon = useCallback(async () => {
    try {
      const response: any = await commonAPI.getAll();
      const raw = response?.data?.data || response?.data || response;
      if (raw?.models || raw?.colors || raw?.materials || raw?.sizes || response?.code === "OK" || response?.data?.code === "OK") {
        setCommon({
          models: raw?.models || [],
          materials: raw?.materials || [],
          sizes: raw?.sizes || [],
          colors: raw?.colors || [],
        });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const user = storageUtils.getUser();
    if (user?.role === "influencer") {
      toast.error("Access restricted: Influencers can only view product details.");
      router.replace("/influencer/products");
      return;
    }
    const delay = setTimeout(() => {
      setLoading(true);
      fetchCommon();
      fetchProduct(id);
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchCommon, fetchProduct, id, router]);

  useEffect(() => {
    if (redirectTo) if (redirectTo) router.push(redirectTo);
  }, [redirectTo, router]);

  // for now any by monika 
  const toFormData = (data: ProductFormData): FormData => {
    const formData = new FormData();

    // ── Scalar fields ──────────────────────────────────────────────────────────
    const scalarFields: (keyof ProductFormData)[] = [
      "title",
      "display_price",
      "price",
      "product_type",
      "description",
      "specifications",
      "cat_id",
      "occasion_id",
      "status",
      "video_link",
      "primaryColorId",
      "model_id",
      "influencer_id",
      "commission",
      "commission_type",
      "weight",
      "height",
      "breadth",
      "length"
    ];
    scalarFields.forEach((key) => {
      const value = data[key];
      if (value === null || value === undefined) return;
      formData.append(key, String(value));
    });

    if (data.product_type === "no_sizes") {
      const parsedQty = parseInt(String(data.quantity), 10);
      const qty = isNaN(parsedQty) || parsedQty < 0 ? 0 : parsedQty;
      formData.set("quantity", String(qty));
    } else {
      formData.set("quantity", "0");
    }

    const finalInfluencer = data.influencer_id || data.model_id || "";
    if (finalInfluencer) {
      formData.set("influencer_id", finalInfluencer);
      formData.set("model_id", finalInfluencer);
    }
    formData.set("commission", String(data.commission !== undefined && data.commission !== null ? data.commission : 0));
    const commType = data.commission_type || "percentage";
    formData.set("commission_type", commType);
    formData.set("commission_Type", commType);

    // ── Video ──────────────────────────────────────────────────────────────────
    if (data.video && data.video.length > 0) {
      formData.append("video", data.video[0]);
    }

    // ── Variants ───────────────────────────────────────────────────────────────
    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}]`, JSON.stringify(variant));
    });

    // ── Materials ──────────────────────────────────────────────────────────────
    data.metarial.forEach((mat, index) => {
      formData.append(`metarial[${index}]`, JSON.stringify(mat));
    });

    // ── Media ──────────────────────────────────────────────────────────────────
    /**
     * For each media group:
     *   - Append color_id
     *   - For each file slot (already filtered — deleted ones excluded upstream):
     *       • If file binary exists (new upload OR replace) → append to `files` + set file_ref
     *       • file_id → existing DB _id (or "" for brand-new slots)
     *       • is_primary, role, sort_order always sent
     */
    data.media.forEach((mediaItem, mediaIndex) => {
      formData.append(`media[${mediaIndex}][color_id]`, mediaItem.color_id);

      mediaItem.files?.forEach((fileItem, fileIndex) => {
        const fileRef = `file_${mediaIndex}_${fileIndex}`;

        // ── Append binary file (replace OR new upload) ──
        if (fileItem.file) {
          const ext = fileItem.file.name.split(".").pop() ?? "jpg";
          const baseName = fileItem.file.name.replace(/\.[^/.]+$/, "");
          const newFileName = `${fileRef}_${baseName}.${ext}`;
          formData.append("files", fileItem.file, newFileName);
          // Tell the server which media[x][files][y] this binary belongs to
          formData.append(
            `media[${mediaIndex}][files][${fileIndex}][file_ref]`,
            fileRef,
          );
        }

        // ── file_id: existing DB _id for replace/untouched; "" for brand-new ──
        formData.append(
          `media[${mediaIndex}][files][${fileIndex}][file_id]`,
          fileItem.file_id ?? "",
        );

        formData.append(
          `media[${mediaIndex}][files][${fileIndex}][is_primary]`,
          String(fileItem.is_primary),
        );
        formData.append(
          `media[${mediaIndex}][files][${fileIndex}][role]`,
          fileItem.role,
        );
        formData.append(
          `media[${mediaIndex}][files][${fileIndex}][sort_order]`,
          String(fileItem.sort_order ?? fileIndex + 1),
        );
      });
    });
    return formData;
  };

  // Handle Submit
  const handleSubmit = async () => {
    setLoading(true);
    const toastId = toast.loading("Updating...");
    try {
      if (!productValidate(form, setErrors)) {
        toast.error("Please fix the errors in the form", { id: toastId });
        setLoading(false);
        return;
      }
      if (!colorVariantsValid) {
        toast.error(
          "Please fix color variant errors (color, at least 1 image, valid sizes & stock)",
          { id: toastId }
        );
        return;
      }
      form.media = variantData.images.map((img) => ({
        color_id: img.color_id,
        files: img.files
          .filter((f) => f.file || f.file_id)
          .map((f) => ({
            ...(f.file ? { file: f.file } : {}),
            file_id: f.file_id ?? null,
            is_primary: f.is_primary,
            role: f.role,
            sort_order: f.sort_order,
          })) as { file: File; file_id?: string | null; is_primary: number; role: string; sort_order?: number }[],
      }));
      form.primaryColorId = variantData.primaryColorId;
      form.isPrimary = true;
      if (form.product_type === "sizes") {
        form.variants = variantData.variants;
      }
      console.log("Final Form Data:", form);
      const formData = toFormData(form);
      const response = await productsAPI.update(id, formData);
      if (response?.code === "OK") {
        toast.success(`Product updated successfully!`, { id: toastId });
        setRedirectTo("/products");
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ---------- Handlers (typed) ----------
  const handleDescriptionChange = (value: string) => {
    setForm((prev) => ({ ...prev, description: value }));
    if (errors.description) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs.description;
        return newErrs;
      });
    }
  };

  const handleSpecificationsChange = (value: string) => {
    setForm((prev) => ({ ...prev, specifications: value }));
    if (errors.specifications) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs.specifications;
        return newErrs;
      });
    }
  };

  const handleFieldChange = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    const errorKey = field as keyof ProductError;
    if (errors[errorKey]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[errorKey];
        return newErrs;
      });
    }
  };

  type NumberFields = "display_price" | "price" | "quantity" | "weight" | "height" | "breadth" | "length";
  const handleNumberChange = (field: NumberFields, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      handleFieldChange(field, Number(value));
    }
  };

  const handleQuantityChange = (value: string) => {
    if (value === "" || /^\d*$/.test(value)) {
      const num = value === "" ? 0 : parseInt(value, 10);
      handleFieldChange("quantity", isNaN(num) ? 0 : num);
    }
  };

  const hasError = (field: keyof ProductError) => !!errors[field];
  const handleError = (field: keyof ProductError): string => {
    return errors[field] || "";
  };

  const mappedColors = common.colors.map((c) => ({
    id: c._id,
    name: c.name,
    hex: c.hex,
  }));

  const mappedSizes = common.sizes.map((s) => ({
    id: s._id,
    name: s.name,
  }));

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <ColorVariantsSection
          loading={loading}
          product_type={form.product_type}
          colors={mappedColors}
          sizes={mappedSizes}
          onChange={setVariantData}
          onValidationChange={setColorVariantsValid}
          productImages={productImages}
          variants={form.variants as unknown as ApiVariant[]}
          media={form.media as unknown as ApiMedia[]}
          productId={id}
        />

        {/* Basic Details */}
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="e.g. Product Name"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("title") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("title") && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle size={12} /> {handleError("title")}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Product Type<span className="text-red-500">*</span>
              </label>
              <select
                value={form.product_type}
                onChange={(e) =>
                  handleFieldChange(
                    "product_type",
                    e.target.value as "sizes" | "no_sizes",
                  )
                }
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("product_type") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              >
                <option value="">Select</option>
                <option value="sizes">Readymade</option>
                <option value="no_sizes">Unstitched</option>
              </select>
              {hasError("product_type") && (
                <p className="text-red-500 text-xs">
                  {handleError("product_type")}
                </p>
              )}
            </div>
            {form.product_type && form.product_type == "no_sizes" && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                  Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.quantity === 0 ? "" : form.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  placeholder="e.g. Product Quantity"
                  className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("quantity") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
                />
                {hasError("quantity") && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle size={12} /> {handleError("quantity")}
                  </p>
                )}
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Category<span className="text-red-500">*</span>
              </label>
              <AsyncSelect
                className={`w-full px-1 py-1 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("product_type") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
                value={form.cat_id}
                onChange={(val) => setForm({ ...form, cat_id: val })}
                placeholder="Select Category"
                limit={10}
                fetchOptions={({ page, limit, search }) =>
                  categoriesAPI.getAll({ page, limit, search })
                }
                mapOption={(item) => ({
                  label: item.title,
                  value: item._id,
                })}
              />
              {hasError("cat_id") && (
                <p className="text-red-500 text-xs">{handleError("cat_id")}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Occasion <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <AsyncSelect
                className="w-full px-1 py-1 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white border-transparent focus:border-indigo-600"
                value={form.occasion_id || ""}
                onChange={(val) => setForm({ ...form, occasion_id: val })}
                placeholder="Select Occasion"
                limit={10}
                fetchOptions={({ page, limit, search }) =>
                  occasionsAPI.getAll({ page, limit, search })
                }
                mapOption={(item) => ({
                  label: item.title,
                  value: item._id,
                })}
              />
            </div>
            <div className="space-y-1">
              <div className="w-full">
                {/* Label */}
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Upload files (Videos)
                </label>
                {/* Input */}
                <input
                  type="file"
                  multiple
                  accept="video/mp4"
                  onChange={(e) => {
                    const selected = Array.from(e.target.files || []);
                    //❗check each file size
                    const oversized = selected.find(
                      (file) => file.size > 5 * 1024 * 1024,
                    );
                    if (oversized) {
                      toast.error("Video must be under 5MB");
                      e.target.value = "";
                      return;
                    }
                    handleFieldChange("video", selected);
                  }}
                  className="block w-full text-sm text-slate-600 file:mr-3 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-400 file:text-white hover:file:bg-gray-500 cursor-pointer border border-slate-300 rounded-lg p-2"
                />
              </div>
              {form.video && typeof form.video === "string" && (
                <span className="text-xs text-slate-500">
                  <Link
                    href={form.video as string}
                    target="_blank"
                  >
                    View Uploaded Video
                  </Link>
                </span>
              )}
              {hasError("video") && (
                <p className="text-red-500 text-xs">{handleError("video")}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Video (Redirect Link)
              </label>
              <input
                type="text"
                value={form.video_link}
                onChange={(e) =>
                  handleFieldChange("video_link", e.target.value)
                }
                placeholder="e.g., Organic Cotton Bodysuit"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("video_link") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("video_link") && (
                <p className="text-red-500 text-xs">
                  {handleError("video_link")}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Influencer
              </label>
              <select
                value={form.model_id || form.influencer_id || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    model_id: val,
                    influencer_id: val,
                  }));
                }}
                className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl outline-none focus:border-indigo-600"
              >
                <option value="">Select Influencer</option>
                {common?.models?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {hasError("model_id") && (
                <p className="text-red-500 text-xs">
                  {handleError("model_id")}
                </p>
              )}
            </div>

            {/* COMMISSION & TYPE FIELDS - Only show when influencer is selected */}
            {(form.model_id || form.influencer_id) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-purple-50/60 rounded-2xl border border-purple-100 col-span-full">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-purple-900 uppercase tracking-wider ml-1">
                    Commission Number
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={form.commission !== undefined && form.commission !== null ? (form.commission === 0 ? "" : form.commission) : ""}
                    onChange={(e) =>
                      handleFieldChange("commission", e.target.value === "" ? 0 : Number(e.target.value))
                    }
                    placeholder={form.commission_type === 'flat' ? 'e.g. 150 (Flat ₹)' : 'e.g. 10 (10%)'}
                    className="w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl outline-none focus:border-purple-600 text-sm font-medium"
                  />
                  <p className="text-xs text-purple-600 mt-1">
                    {form.commission_type === 'flat'
                      ? 'Flat commission amount in ₹ per item'
                      : 'Commission percentage (%) of product price'}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-purple-900 uppercase tracking-wider ml-1">
                    Commission Type
                  </label>
                  <select
                    value={form.commission_type || "percentage"}
                    onChange={(e) =>
                      handleFieldChange(
                        "commission_type",
                        e.target.value as "percentage" | "flat"
                      )
                    }
                    className="w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl outline-none focus:border-purple-600 text-sm font-medium"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Fabric
              </label>
              <div className="flex gap-2">
                <select
                  value={form.metarial[0]?.id || ""}
                  onChange={(e) =>
                    handleFieldChange("metarial", [{ id: e.target.value }])
                  }
                  className={`flex-1 px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("metarial") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
                >
                  <option value="">Select</option>
                  {common?.materials?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {/* <button
                  type="button"
                  onClick={() => true}
                  className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-all flex items-center gap-1 whitespace-nowrap"
                >
                  <PlusCircle size={16} /> New
                </button> */}
              </div>
              {hasError("metarial") && (
                <p className="text-red-500 text-xs">
                  {handleError("metarial")}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Description
              </label>
              <RichTextEditor
                key={form.description}
                value={form.description}
                onChange={handleDescriptionChange}
                placeholder="Product description (supports bold, lists, headings...)"
              />
              {hasError("description") && (
                <p className="text-red-500 text-xs mt-1">
                  {handleError("description")}
                </p>
              )}
            </div>
            <div className="col-span-full">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                specifications
              </label>
              <RichTextEditor
                key={form.specifications}
                value={form.specifications}
                onChange={handleSpecificationsChange}
                placeholder="Product description (supports bold, lists, headings...)"
              />
              {hasError("specifications") && (
                <p className="text-red-500 text-xs mt-1">
                  {handleError("specifications")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                Dimensions &amp; Weight
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Enter weight and dimensions (used to calculate shipment applied weight)
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs text-indigo-700">
              <span className="font-medium text-slate-500">Total Applied Weight:</span>
              <span className="font-extrabold text-indigo-900">{appliedWeight} kg</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.weight}
                onChange={(e) =>
                  handleNumberChange("weight", e.target.value)
                }
                placeholder="0.00"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("weight") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("weight") && (
                <p className="text-red-500 text-xs">
                  {handleError("weight")}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Height (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.height}
                onChange={(e) => handleNumberChange("height", e.target.value)}
                placeholder="0.00"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("height") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("height") && (
                <p className="text-red-500 text-xs">{handleError("height")}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Breadth (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.breadth}
                onChange={(e) => handleNumberChange("breadth", e.target.value)}
                placeholder="0.00"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("breadth") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("breadth") && (
                <p className="text-red-500 text-xs">{handleError("breadth")}</p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Length (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.length}
                onChange={(e) => handleNumberChange("length", e.target.value)}
                placeholder="0.00"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("length") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("length") && (
                <p className="text-red-500 text-xs">{handleError("length")}</p>
              )}
            </div>
          </div>

          {/* Applied Weight Summary Card (Frontend display only - Not saved to DB) */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Actual Weight
                </span>
                <span className="text-sm font-extrabold text-slate-700">
                  {Number(form.weight || 0).toFixed(2)} kg
                </span>
              </div>
              <div className="hidden sm:block h-7 w-px bg-slate-200" />
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Volumetric Weight ((L×B×H)/5000)
                </span>
                <span className="text-sm font-extrabold text-slate-700">
                  {volumetricWeight} kg
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-indigo-600 px-4 py-2.5 rounded-xl text-white shadow-sm">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-100">
                  Total Applied Weight
                </span>
                <span className="text-base sm:text-lg font-black leading-tight">
                  {appliedWeight} kg
                </span>
              </div>
              <span className="text-[10px] text-indigo-200 ml-2 hidden md:inline">
                (Max of Actual &amp; Volumetric)
              </span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
            Pricing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                Base Price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.display_price}
                onChange={(e) =>
                  handleNumberChange("display_price", e.target.value)
                }
                placeholder="0.00"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("display_price") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("display_price") && (
                <p className="text-red-500 text-xs">
                  {handleError("display_price")}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider ml-1">
                MRP (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.price}
                onChange={(e) => handleNumberChange("price", e.target.value)}
                placeholder="0.00"
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("price") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              />
              {hasError("price") && (
                <p className="text-red-500 text-xs">{handleError("price")}</p>
              )}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-8 pb-12">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full max-w-md bg-indigo-600 text-white py-5 rounded-full font-black uppercase text-sm tracking-wider shadow-xl hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
}