"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { Loader2, AlertCircle, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { categoriesAPI, productsAPI, commonAPI } from "@/lib/integration";
import AsyncSelect from "@/components/admin/select/select";
import ColorVariantsSection from "@/components/admin/product/ColorVariantsSection";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { productValidate } from "@/validations/product";
import { storageUtils } from "@/lib/storage";

// Lazy-load heavy components for faster page load
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <div className="border border-slate-200 rounded-xl bg-slate-50 p-4 min-h-[150px] animate-pulse" />,
});
interface ProductFormData {
  title: string;
  display_price: number;
  price: number;
  quantity: number;
  product_type: "sizes" | "no_sizes" | "";
  description: string;
  specifications: string;
  cat_id: string;
  status: boolean;
  video: File[];
  video_link: string;
  primaryColorId: string | null;
  isPrimary: boolean;
  model_id: string;
  influencer_id?: string;
  weight: number;
  height: number;
  breadth:  number;    
  length: number;
  commission?: number;
  commission_type?: "percentage" | "flat" | "";
  type?: number;
  metarial: {
    id: string;
  }[];
  media: {
    color_id: string;
    files: {
      file: File;
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

type VariantData = {
  primaryColorId: string | null;
  images: {
    color_id: string;
    files: {
      file?: File;
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

// ---------- Component ----------
export default function CreateProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const colorVariantsValidRef = useRef(false);
  const [redirectTo, setRedirectTo] = useState("");

  const [common, setCommon] = useState<CommonData>({
    models: [],
    materials: [],
    sizes: [],
    colors: [],
  });

  const variantDataRef = useRef<VariantData>({
    primaryColorId: null,
    images: [],
    variants: [],
  });

  const handleVariantChange = useCallback((data: VariantData) => {
    variantDataRef.current = data;
  }, []);

  const handleValidationChange = useCallback((isValid: boolean) => {
    colorVariantsValidRef.current = isValid;
  }, []);

  const [form, setForm] = useState<ProductFormData>({
    title: "",
    display_price: 0,
    price: 0,
    quantity: 0,
    product_type: "" as any,
    description: "",
    specifications: "",
    cat_id: "",
    status: true,
    video: [],
    video_link: "",
    primaryColorId: null,
    isPrimary: false,
    model_id: "",
    weight: 0,
    height: 0,
    breadth: 0,
    length: 0,
    commission: 0,
    commission_type: "" as any,
    type: 1,
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

  const fetchCommon = useCallback(async () => {
    try {
      const response = await commonAPI.getAll();
      const resData = response?.data || response;
      if (resData?.code === "OK") {
        setCommon({
          models: resData?.data?.models || [],
          materials: resData?.data?.materials || [],
          sizes: resData?.data?.sizes || [],
          colors: resData?.data?.colors || [],
        });
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  useEffect(() => {
    const user = storageUtils.getUser();
    if (user?.role === "influencer") {
      toast.error("Access restricted: Influencers can only view product details.");
      router.replace("/influencer/products");
      return;
    }
    fetchCommon();
  }, [fetchCommon, router]);

  useEffect(() => {
    if (redirectTo) router.push(redirectTo);
  }, [redirectTo, router]);

  const toFormData = (data: ProductFormData): FormData => {
    const formData = new FormData();
    const scalarFields: (keyof ProductFormData)[] = [
      "title",
      "display_price",
      "price",
      "product_type",
      "description",
      "specifications",
      "cat_id",
      "status",
      "video_link",
      "primaryColorId",
      "isPrimary",
      "model_id",
      "influencer_id",
      "weight",
      "height",
      "breadth",
      "length",
      "commission",
      "commission_type",
      "type"
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

    if (data.video && data.video.length > 0) {
      formData.append("video", data.video[0]); // multer field: { name: 'video', maxCount: 1 }
    }
    data.variants.forEach((variant, index) => {
      formData.append(`variants[${index}]`, JSON.stringify(variant));
    });
    data.metarial.forEach((mat, index) => {
      formData.append(`metarial[${index}]`, JSON.stringify(mat));
    });
    let globalFileIndex = 0;
    data.media.forEach((mediaItem, mediaIndex) => {
      formData.append(`media[${mediaIndex}][color_id]`, mediaItem.color_id);
      mediaItem.files?.forEach((fileItem, fileIndex) => {
        const fileKey = `file_${mediaIndex}_${fileIndex}`;
        const ext = fileItem.file.name.split(".").pop();
        const name = fileItem.file.name.split(".").slice(0, -1).join(".");
        const newFileName = `${fileKey}_${name}.${ext}`;
        formData.append("files", fileItem.file, newFileName);
        formData.append(
          `media[${mediaIndex}][files][${fileIndex}][file_ref]`,
          fileKey,
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
        globalFileIndex++;
      });
    });
    return formData;
  };

  // Handle Submit
  const handleSubmit = async () => {
    if (!productValidate(form, setErrors)) {
      toast.error("Please fix the errors in the form");
      return;
    }
    if (!colorVariantsValidRef.current || variantDataRef.current.images.length === 0) {
      toast.error(
        "Please add at least one color variant with an image and valid sizes/stock"
      );
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating...");
    try {
      const variantData = variantDataRef.current;
      const media = variantData.images.map((img) => ({
        color_id: img.color_id,
        files: img.files
          .filter(
            (
              f,
            ): f is {
              file: File;
              is_primary: number;
              role: string;
              sort_order?: number;
            } => !!f.file,
          )
          .map((f) => ({
            file: f.file,
            is_primary: f.is_primary,
            role: f.role,
            sort_order: f.sort_order,
          })),
      }));

      const submitForm: ProductFormData = {
        ...form,
        media,
        primaryColorId: variantData.primaryColorId,
        isPrimary: true,
        variants: form.product_type === "sizes" ? variantData.variants : [],
      };

      const formData = toFormData(submitForm);
      const response = await productsAPI.create(formData);
      if (response?.data?.code === "OK") {
        toast.success(`Product created successfully!`, { id: toastId });
        setRedirectTo("/products");
      }
    } catch (error) {
      toast.error(getErrorMessage(error), { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  // ---------- Handlers (typed) ----------
  const handleDescriptionChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, description: value }));
    setErrors((prev) => {
      if (!prev.description) return prev;
      const newErrs = { ...prev };
      delete newErrs.description;
      return newErrs;
    });
  }, []);

  const handleSpecificationsChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, specifications: value }));
    setErrors((prev) => {
      if (!prev.specifications) return prev;
      const newErrs = { ...prev };
      delete newErrs.specifications;
      return newErrs;
    });
  }, []);

  const handleFieldChange = useCallback(
    <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));

      const errorKey = field as keyof ProductError;
      setErrors((prev) => {
        if (!prev[errorKey]) return prev;
        const newErrs = { ...prev };
        delete newErrs[errorKey];
        return newErrs;
      });
    },
    []
  );

  type NumberFields = "display_price" | "price" | "quantity" | "weight" | "height" | "breadth" | "length";
  const handleNumberChange = useCallback(
    (field: NumberFields, value: string) => {
      if (value === "" || /^\d*\.?\d*$/.test(value)) {
        handleFieldChange(field, Number(value));
      }
    },
    [handleFieldChange]
  );

  const handleQuantityChange = useCallback(
    (value: string) => {
      if (value === "" || /^\d*$/.test(value)) {
        const num = value === "" ? 0 : parseInt(value, 10);
        handleFieldChange("quantity", isNaN(num) ? 0 : num);
      }
    },
    [handleFieldChange]
  );

  const hasError = useCallback((field: keyof ProductError) => !!errors[field], [errors]);
  const handleError = useCallback((field: keyof ProductError): string => errors[field] || "", [errors]);

  const fetchCategoryOptions = useCallback(
    ({ page, limit, search }: { page: number; limit: number; search: string }) =>
      categoriesAPI.getAll({ page, limit, search }),
    []
  );

  const mapCategoryOption = useCallback(
    (item: any) => ({
      label: item.title,
      value: item._id,
    }),
    []
  );

  const handleCatIdChange = useCallback(
    (val: string) => {
      handleFieldChange("cat_id", val);
    },
    [handleFieldChange]
  );

  const mappedColors = useMemo(
    () =>
      common.colors.map((c) => ({
        id: c._id,
        name: c.name,
        hex: c.hex,
      })),
    [common.colors]
  );

  const mappedSizes = useMemo(
    () =>
      common.sizes.map((s) => ({
        id: s._id,
        name: s.name,
      })),
    [common.sizes]
  );

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
          onChange={handleVariantChange}
          onValidationChange={handleValidationChange}
          onRefreshSizes={fetchCommon}
          onProductTypeChange={(type) => handleFieldChange("product_type", type)}
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
                    e.target.value as "sizes" | "no_sizes" | "",
                  )
                }
                className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("product_type") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
              >
                <option value="">Select Product Type</option>
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
                onChange={handleCatIdChange}
                placeholder="Select Category"
                limit={10}
                fetchOptions={fetchCategoryOptions}
                mapOption={mapCategoryOption}
              />
              {hasError("cat_id") && (
                <p className="text-red-500 text-xs">{handleError("cat_id")}</p>
              )}
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
                    value={form.commission_type || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "commission_type",
                        e.target.value as "percentage" | "flat" | ""
                      )
                    }
                    className="w-full px-4 py-2.5 bg-white border-2 border-purple-200 rounded-xl outline-none focus:border-purple-600 text-sm font-medium"
                  >
                    <option value="">Select Commission Type</option>
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
                    handleFieldChange(
                      "metarial",
                      e.target.value ? [{ id: e.target.value }] : []
                    )
                  }
                  className={`flex-1 px-4 py-3 bg-slate-50 border-2 rounded-xl outline-none transition-all focus:bg-white ${hasError("metarial") ? "border-red-500 bg-red-50" : "border-transparent focus:border-indigo-600"}`}
                >
                  <option value="">Select Fabric</option>
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
          <h3 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
            Dimensions
          </h3>
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
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
