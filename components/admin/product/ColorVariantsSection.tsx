"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Box,
  Trash2,
  UploadCloud,
  X,
  Star,
  Plus,
  Ruler,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

type SizeItem = {
  id: number;
  size_id: string;
  stock: number;
  sku: string;
};

type MediaItem = {
  file?: File;
  preview?: string;
  role: string;
  is_primary: number;
  sort_order: number;
};

type ColorGroup = {
  id: number;
  color_id: string;
  media_gallery: MediaItem[];
  sizes: SizeItem[];
};

type ColorItem = {
  id: string;
  name: string;
  hex?: string;
};

type VariantData = {
  primaryColorId: string | null;
  images: {
    color_id: string;
    files: {
      file?: File;
      role: string;
      is_primary: number;
    }[];
  }[];
  variants: {
    color_id: string;
    size_id: string;
    quantity: number;
  }[];
};

// Add to Props interface
interface Props {
  colors: ColorItem[];
  sizes: { id: string; name: string }[];
  loading: boolean;
  onChange: (data: VariantData) => void;
  product_type: "sizes" | "no_sizes";
  onValidationChange?: (isValid: boolean) => void; // ← ADD THIS
}

// Add after colorGroups state
type ColorGroupError = {
  color_id?: string;
  images?: string;
  sizes?: string;
};

export default function ColorVariantsSection({
  loading,
  colors,
  sizes,
  onChange,
  product_type,
  onValidationChange,
}: Props) {
  const [colorGroups, setColorGroups] = useState<ColorGroup[]>([]);
  const [primaryColorId, setPrimaryColorId] = useState<string | null>(null);
  // const [groupErrors, setGroupErrors] = useState<
  //   Record<number, ColorGroupError>
  // >({});

  const getImagesPayload = () => {
    return colorGroups.map((group) => ({
      color_id: group.color_id,
      files: group.media_gallery.map((m) => ({
        file: m.file,
        role: m.role,
        is_primary: m.is_primary,
        sort_order: m.sort_order,
      })),
    }));
  };

  const getVariantsPayload = () => {
    const variants: {
      color_id: string;
      size_id: string;
      quantity: number;
    }[] = [];

    colorGroups.forEach((group) => {
      group.sizes.forEach((size) => {
        if (size.size_id) {
          variants.push({
            color_id: group.color_id,
            size_id: size.size_id,
            quantity: size.stock,
          });
        }
      });
    });

    return variants;
  };

  // Add this function before useEffect
  const validateGroups = useCallback(() => {
    const newErrors: Record<number, ColorGroupError> = {};
    let isValid = true;

    colorGroups.forEach((group, gIdx) => {
      const err: ColorGroupError = {};

      if (!group.color_id) {
        err.color_id = "Please select a color";
        isValid = false;
      }

      if (group.media_gallery.length < 1) {
        err.images = "At least 1 image is required";
        isValid = false;
      }

      if (product_type === "sizes") {
        const hasInvalidSize = group.sizes.some(
          (s) => !s.size_id || s.stock < 0,
        );
        if (hasInvalidSize) {
          err.sizes = "Each size must be selected with valid stock quantity (0 or more)";
          isValid = false;
        }
      }

      if (Object.keys(err).length > 0) newErrors[gIdx] = err;
    });

    return { isValid, errors: newErrors };
  }, [colorGroups, product_type]);

  // Effect 1: only call onChange/onValidationChange (no setState)
  const validation = useMemo(() => validateGroups(), [validateGroups]);
  const groupErrors = validation.errors;
  const isValid = validation.isValid;

  useEffect(() => {
    onValidationChange?.(isValid);
    onChange({
      primaryColorId: primaryColorId ? String(primaryColorId) : null,
      images: getImagesPayload(),
      variants: getVariantsPayload(),
    });
  }, [colorGroups, primaryColorId, isValid]);

  // Effect 2: update groupErrors separately
  // useEffect(() => {
  //   const { errors } = validateGroups();
  //   setGroupErrors(errors);
  // }, [colorGroups]);

  // ---------------- ADD COLOR ----------------
  const addColorVariant = () => {
    if (colorGroups.length >= colors.length) {
      toast.error("No more colors available to add");
      return;
    }
    const id = Date.now();
    setColorGroups((prev) => [
      ...prev,
      {
        id,
        color_id: "",
        media_gallery: [],
        sizes: [{ id: id + 1, size_id: "", stock: 0, sku: "" }],
      },
    ]);
  };

  const removeColorVariant = (id: number) => {
    const updated = colorGroups.filter((g) => g.id !== id);
    setColorGroups(updated);

    if (primaryColorId == colorGroups.find((g) => g.id === id)?.color_id) {
      setPrimaryColorId(updated.length ? updated[0].color_id : null);
    }
  };

  // ---------------- SIZE ----------------
  const addSizeToGroup = (gIdx: number) => {
    const currentSizes = colorGroups[gIdx].sizes;
    console.log("Current sizes for group", gIdx, currentSizes);
    if (currentSizes.length >= sizes.length) {
      toast.error("No more sizes available to add for this color");
      return;
    }
    const updated = [...colorGroups];
    updated[gIdx].sizes.push({
      id: Date.now(),
      size_id: "",
      stock: 0,
      sku: "",
    });
    setColorGroups(updated);
  };

  const updateSizeField = <K extends keyof SizeItem>(
    gIdx: number,
    sIdx: number,
    field: K,
    value: SizeItem[K],
  ) => {
    const updated = [...colorGroups];
    updated[gIdx].sizes[sIdx][field] = value;
    setColorGroups(updated);
  };

  // Update handleStockChange to allow any positive stock
  const handleStockChange = (gIdx: number, sIdx: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const num = Number(value);
      const clamped = value === "" ? 0 : Math.max(num, 0);
      updateSizeField(gIdx, sIdx, "stock", clamped);
    }
  };

  const removeSize = (gIdx: number, sIdx: number) => {
    const updated = [...colorGroups];
    updated[gIdx].sizes.splice(sIdx, 1);
    setColorGroups(updated);
  };

  // ---------- Helper Functions (typed) ----------
  const compressImage = (file: File, maxSizeMB = 10): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDimension = 1600;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(file);
          ctx.drawImage(img, 0, 0, width, height);

          // Fast & efficient JPEG output for e-commerce products
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const newFileName = `${baseName}.jpg`;

          canvas.toBlob(
            (blob) => {
              if (!blob) return resolve(file);
              resolve(
                new File([blob], newFileName, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }),
              );
            },
            "image/jpeg",
            0.82,
          );
        };
        img.onerror = () => resolve(file);
        reader.onerror = () => resolve(file);
      };
    });
  };

  // ---------------- IMAGE ----------------
  const handleImageUpload = async (
    gIdx: number,
    role: string,
    files: FileList,
  ) => {
    if (!files?.length) return;

    const file = files[0];
    
    if (file.size > 25 * 1024 * 1024) {
      toast.error("File size should not exceed 25MB");
      return;
    }

    let finalFile = file;

    // Fast client-side compression to make upload blazing fast
    if (file.type.startsWith("image/") && file.size > 150 * 1024) {
      try {
        finalFile = await compressImage(file);
      } catch {
        finalFile = file;
      }
    }

    const preview = URL.createObjectURL(finalFile);

    setColorGroups((prev) => {
      const updated = [...prev];

      const index = updated[gIdx].media_gallery.findIndex(
        (m) => m.role === role,
      );

      const newMedia: MediaItem = {
        file: finalFile,
        preview,
        role,
        is_primary:
          updated[gIdx].media_gallery.length === 0 || role === "Front" ? 1 : 0,
        sort_order: updated[gIdx].media_gallery.length,
      };

      if (index !== -1) {
        updated[gIdx].media_gallery[index] = newMedia;
      } else {
        updated[gIdx].media_gallery.push(newMedia);
      }

      return updated;
    });
  };

  const setAsPrimaryImage = (gIdx: number, idx: number) => {
    const updated = [...colorGroups];
    updated[gIdx].media_gallery.forEach((m, i) => {
      m.is_primary = i === idx ? 1 : 0;
    });
    setColorGroups(updated);
  };

  const removeImage = (gIdx: number, idx: number) => {
    setColorGroups((prev) => {
      const updated = [...prev];

      const media = updated[gIdx].media_gallery[idx];
      if (media?.preview) {
        URL.revokeObjectURL(media.preview); // ✅ prevent memory leak
      }

      updated[gIdx].media_gallery.splice(idx, 1);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      {/* ADD BUTTON */}

      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
            <Box size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800">
              Create Product
            </h1>
            <p className="text-slate-400 text-sm">
              Add a new product to your catalog
            </p>
          </div>
        </div>
        <button
          disabled={loading}
          onClick={addColorVariant}
          className="w-full md:w-auto bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md"
        >
          <Plus size={18} /> Add Color Variant
        </button>
      </div>

      {/* ORIGINAL UI */}
      {colorGroups.map((group, gIdx) => (
        <div
          key={group.id}
          className={`bg-white rounded-3xl shadow-sm border-2 transition-all overflow-hidden ${
            primaryColorId === group.color_id
              ? "border-indigo-600 shadow-xl scale-[1.01]"
              : "border-slate-200"
          }`}
        >
          {/* HEADER */}
          <div className="bg-slate-900 p-4 md:p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <select
                disabled={loading}
                value={group.color_id}
                onChange={(e) => {
                  const updated = [...colorGroups];
                  updated[gIdx].color_id = e.target.value;
                  setColorGroups(updated);
                }}
                className="bg-slate-800 text-white px-5 py-2.5 rounded-xl"
              >
                <option value="">Select Color</option>
                {colors
                  .filter(
                    (c) =>
                      !colorGroups.some(
                        (g, i) => i !== gIdx && g.color_id === c.id,
                      ),
                  )
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
              {groupErrors[gIdx]?.color_id && (
                <span className="text-red-400 text-xs ml-2">
                  {groupErrors[gIdx].color_id}
                </span>
              )}
              <button
                disabled={!group.color_id}
                onClick={() => setPrimaryColorId(group.color_id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  primaryColorId === group.color_id
                    ? "bg-green-600 text-white"
                    : "bg-indigo-600 text-white"
                }`}
              >
                Default
              </button>
            </div>
            
            {!loading && (
              <button onClick={() => removeColorVariant(group.id)}>
                <Trash2 className="text-red-400" />
              </button>
            )}
          </div>

          {/* BODY */}
          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* IMAGES */}
            <div className="lg:col-span-7">
              <h4 className="text-xs font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
                <ImageIcon size={16} /> Product Images
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {["Front", "Back", "Side", "Detail"].map((role) => {
                  const mediaIndex = group.media_gallery.findIndex(
                    (m) => m.role === role,
                  );
                  const media =
                    mediaIndex !== -1 ? group.media_gallery[mediaIndex] : null;

                  return (
                    <div key={role}>
                      <div className="relative aspect-square rounded-xl border-2 border-dashed flex items-center justify-center">
                        {media ? (
                          <>
                            <Image
                              src={media.preview || "/no-image.png"}
                              alt="Product Image"
                              width={80}
                              height={80}
                              className="w-full h-full object-cover rounded-xl"
                            />
                            {/* Sort order badge ← ADD KARO */}
                            <span className="absolute top-1 left-1 bg-slate-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                              {media.sort_order}
                            </span>
                            <button
                              onClick={() =>
                                setAsPrimaryImage(gIdx, mediaIndex)
                              }
                              className="absolute bottom-1 left-1 bg-yellow-400 p-1 rounded-full"
                            >
                              <Star size={12} />
                            </button>
                            {!loading && (
                              <button
                                onClick={() => removeImage(gIdx, mediaIndex)}
                                className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white"
                              >
                                <X size={12} />
                              </button>
                            )}
                            
                          </>
                        ) : (
                          <>
                            <UploadCloud />
                            <input
                              type="file"
                              disabled={loading}
                              className="absolute inset-0 opacity-0"
                              onChange={(e) =>
                                e.target.files &&
                                handleImageUpload(gIdx, role, e.target.files)
                              }
                              accept="image/png, image/jpeg, image/jpg"
                            />
                          </>
                        )}
                      </div>
                      <p className="text-[9px] text-center mt-1 uppercase">
                        {role}
                      </p>
                    </div>
                  );
                })}
              </div>
              {groupErrors[gIdx]?.images && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <AlertCircle size={12} /> {groupErrors[gIdx].images}
                </p>
              )}
            </div>

            {/* SIZES */}

            {product_type && product_type == "sizes" && (
              <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-black text-slate-600 flex items-center gap-2">
                    <Ruler size={14} /> Sizes & Stock
                  </h4>

                  <button
                    onClick={() => addSizeToGroup(gIdx)}
                    className="text-[10px] bg-white px-3 py-1.5 rounded-xl border font-bold text-indigo-600 border-indigo-100 hover:bg-indigo-50 shadow-sm"
                  >
                    + Add Size
                  </button>
                </div>

                {/* Helper text */}
                <p className="text-[9px] text-slate-400 mb-3">
                  SKU auto-generates when Brand, Category Code, Product Code,
                  Color, and Size are selected
                </p>

                {/* Scroll Area */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {group.sizes.map((size, sIdx) => (
                    <div
                      key={size.id}
                      className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row gap-2">
                        {/* Size Dropdown */}
                        <select
                          disabled={loading}
                          value={size.size_id}
                          onChange={(e) =>
                            updateSizeField(
                              gIdx,
                              sIdx,
                              "size_id",
                              e.target.value,
                            )
                          }
                          className="flex-1 p-2.5 bg-slate-50 rounded-lg text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none"
                        >
                          <option value="">Select Size</option>
                          {sizes
                            .filter(
                              (sz) =>
                                !group.sizes.some(
                                  (s, i) => i !== sIdx && s.size_id === sz.id,
                                ),
                            )
                            .map((sz) => (
                              <option key={sz.id} value={sz.id}>
                                {sz.name}
                              </option>
                            ))}
                        </select>

                        {/* Stock Input */}
                        <input
                          type="text"
                          inputMode="numeric"
                          min={0}
                          placeholder="Stock"
                          value={size.stock || ""}
                          readOnly={loading}
                          onChange={(e) =>
                            handleStockChange(gIdx, sIdx, e.target.value)
                          }
                          className="w-full sm:w-24 p-2.5 bg-slate-50 rounded-lg text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none"
                        />

                        {/* Remove */}
                        {!loading && (
                          <button
                            onClick={() => removeSize(gIdx, sIdx)}
                            className="text-slate-400 hover:text-red-500 p-2"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      {/* SKU */}
                      {size.sku && (
                        <div className="mt-1 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
                          <p className="text-[10px] font-mono text-indigo-700 font-bold break-all">
                            🔑 SKU: {size.sku}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  {groupErrors[gIdx]?.sizes && (
                    <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                      <AlertCircle size={12} /> {groupErrors[gIdx].sizes}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
