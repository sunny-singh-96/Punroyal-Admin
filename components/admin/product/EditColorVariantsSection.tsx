"use client";
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  startTransition,
} from "react";
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
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/lib/helpers/handlers";
import { confirmDelete } from "@/lib/sweetAlert";
import { productsAPI } from "@/lib/integration";

// ─── Types ────────────────────────────────────────────────────────────────────
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
  existing_id?: string;
  isExisting?: boolean;
  /** true = user replaced this existing image with a new file */
  isReplaced?: boolean;
  /** true = this existing image was deleted by user (soft-delete) */
  isDeleted?: boolean;
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
      file_id?: string | null;
      file_ref?: string;
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

type ProductImageRecord = {
  _id: string;
  url: string;
  color_id: string;
  role: string;
  isPrimary: boolean;
  sortOrder: number;
};

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
interface Props {
  colors: ColorItem[];
  sizes: { id: string; name: string }[];
  loading: boolean;
  onChange: (data: VariantData) => void;
  product_type: "sizes" | "no_sizes";
  onValidationChange?: (isValid: boolean) => void;
  productImages?: ProductImageRecord[];
  variants?: ApiVariant[];
  media?: ApiMedia[];
  productId?: string;
}

type ColorGroupError = {
  color_id?: string;
  images?: string;
  sizes?: string;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ColorVariantsSection({
  loading,
  colors,
  sizes,
  onChange,
  product_type,
  onValidationChange,
  productImages = [],
  variants: apiVariants = [],
  media: apiMedia = [],
  productId,
}: Props) {
  const [colorGroups, setColorGroups] = useState<ColorGroup[]>([]);
  const [primaryColorId, setPrimaryColorId] = useState<string | null>(null);
  const initialised = useRef(false);

  // ── Seed from API data ──────────────────────────────────────────────────────
  useEffect(() => {
    if (initialised.current) return;
    if (!productImages.length && !apiVariants.length) return;
    if (!colors.length) return;
    initialised.current = true;

    const imagesByColor: Record<string, ProductImageRecord[]> = {};
    productImages.forEach((img) => {
      if (!imagesByColor[img.color_id]) imagesByColor[img.color_id] = [];
      imagesByColor[img.color_id].push(img);
    });

    const sizesByColor: Record<string, { size_id: string; stock: number }[]> =
      {};
    apiVariants.forEach((v) => {
      const cid = v.color._id;
      if (!sizesByColor[cid]) sizesByColor[cid] = [];
      sizesByColor[cid].push({ size_id: v.size._id, stock: v.stock });
    });

    const colorIds = Array.from(
      new Set([...Object.keys(imagesByColor), ...Object.keys(sizesByColor)]),
    );
    if (!colorIds.length) return;

    const groups: ColorGroup[] = colorIds.map((colorId, idx) => {
      const imgs = (imagesByColor[colorId] || []).sort(
        (a, b) => a.sortOrder - b.sortOrder,
      );
      const media_gallery: MediaItem[] = imgs.map((img) => ({
        preview: img.url,
        role: img.role,
        is_primary: img.isPrimary ? 1 : 0,
        sort_order: img.sortOrder,
        existing_id: img._id,
        isExisting: true,
        isReplaced: false,
        isDeleted: false,
      }));

      const sz = sizesByColor[colorId] || [];
      const builtSizes: SizeItem[] =
        sz.length > 0
          ? sz.map((s, i) => ({
              id: Date.now() + idx * 1000 + i,
              size_id: s.size_id,
              stock: s.stock,
              sku: "",
            }))
          : [{ id: Date.now() + idx * 1000, size_id: "", stock: 0, sku: "" }];

      return {
        id: Date.now() + idx,
        color_id: colorId,
        media_gallery,
        sizes: builtSizes,
      };
    });

    startTransition(() => {
      setColorGroups(groups);
      const primaryMedia = apiMedia.find((m) => m.isPrimary);
      if (primaryMedia) {
        setPrimaryColorId(primaryMedia.color_id);
      } else if (groups.length) {
        setPrimaryColorId(groups[0].color_id);
      }
    });
  }, [productImages, apiVariants, apiMedia, colors]);

  // ── Payload builder ────────────────────────────────────────────────────────
  /**
   * Rules:
   * 1. DELETED existing image   → exclude entirely (don't send to server)
   * 2. REPLACED existing image  → send file binary + file_id (existing _id) + file_ref
   * 3. NEW image (no existing)  → send file binary + file_id="" + file_ref
   * 4. UNTOUCHED existing image → send file_id only (no file, no file_ref)
   */
  const getImagesPayload = useCallback((): VariantData["images"] => {
    return colorGroups.map((group) => ({
      color_id: group.color_id,
      files: group.media_gallery
        // ── Exclude soft-deleted existing images ──
        .filter((m) => !m.isDeleted)
        .map((m) => ({
          ...(m.file ? { file: m.file } : {}), // binary only when a new file was chosen
          file_id: m.existing_id ?? null, // existing DB _id or null for brand-new
          ...(m.file ? { file_ref: `file_ref_${m.role}` } : {}), // ref only when uploading
          role: m.role,
          is_primary: m.is_primary,
          sort_order: m.sort_order,
        })),
    }));
  }, [colorGroups]);

  const getVariantsPayload = useCallback((): VariantData["variants"] => {
    const variants: VariantData["variants"] = [];
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
  }, [colorGroups]);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validateGroups = useCallback(() => {
    const newErrors: Record<number, ColorGroupError> = {};
    let isValid = true;
    colorGroups.forEach((group, gIdx) => {
      const err: ColorGroupError = {};
      if (!group.color_id) {
        err.color_id = "Please select a color";
        isValid = false;
      }
      // Count only non-deleted items
      const visibleImages = group.media_gallery.filter((m) => !m.isDeleted);
      if (visibleImages.length < 3) {
        err.images = "At least 3 images are required";
        isValid = false;
      }
      if (product_type === "sizes") {
        const hasInvalidSize = group.sizes.some(
          (s) => !s.size_id || s.stock < 1 || s.stock > 20,
        );
        if (hasInvalidSize) {
          err.sizes = "Each size must be selected with quantity between 1–20";
          isValid = false;
        }
      }
      if (Object.keys(err).length > 0) newErrors[gIdx] = err;
    });
    return { isValid, errors: newErrors };
  }, [colorGroups, product_type]);

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

  // ── Add / Remove Color Group ───────────────────────────────────────────────
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

  const removeColorVariant = useCallback(
    async (id: string, color_id: string) => {
      try {
        if (colorGroups?.length > 1) {
          const isConfirmed = await confirmDelete("Delete this color group?");
          if (!isConfirmed) return;
          if (productId) {
            const response = await productsAPI.deleteColorGroup("REMOVE_COLOR_GROUP", productId, color_id);
            if (response?.code === "OK") {
              const updated = colorGroups.filter((g) => g.id !== Number(id));
              setColorGroups(updated);
              if (
                primaryColorId ===
                colorGroups.find((g) => g.id === Number(id))?.color_id
              ) {
                setPrimaryColorId(updated.length ? updated[0].color_id : null);
              }
            }
          } else {
            const updated = colorGroups.filter((g) => g.id !== Number(id));
            setColorGroups(updated);
            if (
              primaryColorId ===
              colorGroups.find((g) => g.id === Number(id))?.color_id
            ) {
              setPrimaryColorId(updated.length ? updated[0].color_id : null);
            }
          }
        } else {
          toast.error("Cannot remove the last color group.");
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      }
    },
    [productId, colorGroups, primaryColorId],
  );

  // const removeColorVariant = (id: number, color_id: string) => {
  //   console.log("Removing color group with id:", color_id);
  //   const updated = colorGroups.filter((g) => g.id !== id);
  //   setColorGroups(updated);
  //   if (primaryColorId === colorGroups.find((g) => g.id === id)?.color_id) {
  //     setPrimaryColorId(updated.length ? updated[0].color_id : null);
  //   }
  // };

  // ── Sizes ──────────────────────────────────────────────────────────────────
  const addSizeToGroup = (gIdx: number) => {
    const currentSizes = colorGroups[gIdx].sizes;
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

  const handleStockChange = (gIdx: number, sIdx: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const num = Number(value);
      const clamped = value === "" ? 0 : Math.min(Math.max(num, 0), 20);
      updateSizeField(gIdx, sIdx, "stock", clamped);
    }
  };

  const removeSize = (gIdx: number, sIdx: number) => {
    const updated = [...colorGroups];
    updated[gIdx].sizes.splice(sIdx, 1);
    setColorGroups(updated);
  };

  // ── Image helpers ──────────────────────────────────────────────────────────
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          const maxDimension = 1200;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height * maxDimension) / width;
              width = maxDimension;
            } else {
              width = (width * maxDimension) / height;
              height = maxDimension;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject(new Error("Could not get canvas context"));
          ctx.drawImage(img, 0, 0, width, height);
          const outputType =
            file.type === "image/png" ? "image/png" : "image/jpeg";
          const outputExt = file.type === "image/png" ? ".png" : ".jpg";
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("Canvas toBlob failed"));
              resolve(
                new File([blob], `${baseName}${outputExt}`, {
                  type: outputType,
                  lastModified: Date.now(),
                }),
              );
            },
            outputType,
            0.8,
          );
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  /**
   * REPLACE: keeps existing_id, sets isReplaced=true, updates file + preview.
   * NEW UPLOAD: pushes a fresh MediaItem with no existing_id.
   */
  const handleImageUpload = async (
    gIdx: number,
    role: string,
    files: FileList,
  ) => {
    if (!files?.length) return;
    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should not exceed 5MB");
      return;
    }

    let finalFile = file;
    if (file.size > 500 * 1024) {
      finalFile = await compressImage(file);
    }

    // Create preview BEFORE setState so it's ready immediately
    const preview = URL.createObjectURL(finalFile);

    setColorGroups((prev) => {
      const updated = prev.map((g, i) => {
        if (i !== gIdx) return g;

        const gallery = [...g.media_gallery];
        const index = gallery.findIndex((m) => m.role === role);

        if (index !== -1) {
          // ── REPLACE existing or previously-uploaded slot ──
          // Revoke old blob URL to free memory
          if (gallery[index].preview?.startsWith("blob:")) {
            URL.revokeObjectURL(gallery[index].preview!);
          }
          gallery[index] = {
            ...gallery[index],
            file: finalFile,
            preview, // ← new blob URL so <img> re-renders immediately
            isReplaced: true, // ← flag: server must receive file binary + file_id
            isDeleted: false,
          };
        } else {
          // ── Brand-new slot ──
          gallery.push({
            file: finalFile,
            preview,
            role,
            is_primary:
              gallery.filter((m) => !m.isDeleted).length === 0 ||
              role === "Front"
                ? 1
                : 0,
            sort_order: gallery.filter((m) => !m.isDeleted).length + 1,
            existing_id: undefined,
            isExisting: false,
            isReplaced: false,
            isDeleted: false,
          });
        }

        return { ...g, media_gallery: gallery };
      });

      return updated;
    });
  };

  const setAsPrimaryImage = (gIdx: number, idx: number) => {
    setColorGroups((prev) =>
      prev.map((g, i) => {
        if (i !== gIdx) return g;
        return {
          ...g,
          media_gallery: g.media_gallery.map((m, mi) => ({
            ...m,
            is_primary: mi === idx ? 1 : 0,
          })),
        };
      }),
    );
  };

  /**
   * DELETE:
   * - Existing image (from DB) → soft-delete (isDeleted=true), hidden from UI,
   *   excluded from payload so server knows to remove it.
   * - New image (never saved) → hard remove from array + revoke blob URL.
   */

  // New fucntion
  // const removeImage = useCallback(async (gIdx: number, idx: number, _id: string | undefined) => {
  //   try {
  //     const response = await productsAPI.deleteColorGroup('REMOVE_COLOR_GROUP', productId, _id);
  //     const isConfirmed = await confirmDelete("Delete this image?");
  //     if (!isConfirmed) return;
  //     if (response?.code === "OK") {
  //       setColorGroups((prev) =>
  //         prev.map((g, i) => {
  //           if (i !== gIdx) return g;
  //           const gallery = [...g.media_gallery];
  //           const media = gallery[idx];
  //           if (media.isExisting) {
  //             gallery[idx] = { ...media, isDeleted: true };
  //           } else {
  //             // Hard-delete: revoke blob URL and splice out
  //             if (media.preview?.startsWith("blob:")) {
  //               URL.revokeObjectURL(media.preview);
  //             }
  //             gallery.splice(idx, 1);
  //           }
  //           return { ...g, media_gallery: gallery };
  //         }),
  //       );
  //     }
  //   } catch (error) {
  //     toast.error(getErrorMessage(error));
  //   }
  // }, [productId]);

  const removeImage = (gIdx: number, idx: number, _id: string | undefined) => {
    console.log("Removing image with id:", _id);
    setColorGroups((prev) =>
      prev.map((g, i) => {
        if (i !== gIdx) return g;
        const gallery = [...g.media_gallery];
        const media = gallery[idx];
        if (media.isExisting) {
          gallery[idx] = { ...media, isDeleted: true };
        } else {
          if (media.preview?.startsWith("blob:")) {
            URL.revokeObjectURL(media.preview);
          }
          gallery.splice(idx, 1);
        }
        return { ...g, media_gallery: gallery };
      }),
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg">
            <Box size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800">
              Update Product
            </h1>
            <p className="text-slate-400 text-sm">
              Manage color variants, images &amp; stock
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

      {/* Color Groups */}
      {colorGroups.map((group, gIdx) => (
        <div
          key={group.id}
          className={`bg-white rounded-3xl shadow-sm border-2 transition-all overflow-hidden ${
            primaryColorId === group.color_id
              ? "border-indigo-600 shadow-xl scale-[1.01]"
              : "border-slate-200"
          }`}
        >
          {/* Group Header */}
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
              {group.color_id &&
                (() => {
                  const color = colors.find((c) => c.id === group.color_id);
                  return color?.hex ? (
                    <span
                      title={color.name}
                      className="inline-block w-6 h-6 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: color.hex }}
                    />
                  ) : null;
                })()}
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
              <button
                onClick={() => removeColorVariant(String(group.id), group.color_id)}
              >
                <Trash2 className="text-red-400" />
              </button>
            )}
          </div>

          {/* Group Body */}
          <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Images */}
            <div className="lg:col-span-7">
              <h4 className="text-xs font-black uppercase text-slate-400 mb-4 flex items-center gap-2">
                <ImageIcon size={16} /> Product Images
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {["Front", "Back", "Side", "Detail"].map((role) => {
                  // Find the slot for this role, skipping soft-deleted ones
                  const mediaIndex = group.media_gallery.findIndex(
                    (m) => m.role === role && !m.isDeleted,
                  );
                  const media =
                    mediaIndex !== -1 ? group.media_gallery[mediaIndex] : null;

                  return (
                    <div key={role}>
                      <div className="relative aspect-square rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden bg-slate-50">
                        {media ? (
                          <>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={media.preview}
                              alt={`${role} image`}
                              className="w-full h-full object-cover rounded-xl"
                            />

                            {/* Sort order badge */}
                            <span className="absolute top-1 left-1 bg-slate-800 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                              {media.sort_order}
                            </span>

                            {/* Primary star */}
                            <button
                              onClick={() =>
                                setAsPrimaryImage(gIdx, mediaIndex)
                              }
                              className="absolute bottom-1 left-1 bg-yellow-400 p-1 rounded-full"
                              title="Set as primary"
                            >
                              <Star
                                size={12}
                                fill={media.is_primary ? "white" : "none"}
                                stroke={media.is_primary ? "gold" : "white"}
                              />
                            </button>

                            {/*
                             * REPLACE button — shown for existing (DB) images.
                             * After replacing, isReplaced=true and preview=new blob URL,
                             * so the <img> above shows the new file immediately.
                             */}
                            <label
                              className="absolute top-1 right-1 bg-blue-500 p-1 rounded-full text-white cursor-pointer"
                              title={
                                media.isReplaced
                                  ? "Replace again"
                                  : "Replace image"
                              }
                            >
                              <RefreshCw size={12} />
                              <input
                                type="file"
                                disabled={loading}
                                className="hidden"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={(e) =>
                                  e.target.files &&
                                  handleImageUpload(gIdx, role, e.target.files)
                                }
                              />
                            </label>

                            {/*
                             * DELETE button:
                             * - Existing image → soft-delete (hidden from UI, excluded from payload)
                             * - New image → hard remove
                             */}
                            {!loading && (
                              <button
                                onClick={() =>
                                  removeImage(
                                    gIdx,
                                    mediaIndex,
                                    media.existing_id,
                                  )
                                }
                                className="absolute bottom-1 right-1 bg-red-500 p-1 rounded-full text-white"
                                title="Delete image"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </>
                        ) : (
                          /* Empty slot → Upload */
                          <>
                            <div className="flex flex-col items-center gap-1 pointer-events-none">
                              <UploadCloud
                                className="text-slate-400"
                                size={20}
                              />
                              <span className="text-[9px] text-slate-400">
                                Upload
                              </span>
                            </div>
                            <input
                              type="file"
                              disabled={loading}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={(e) =>
                                e.target.files &&
                                handleImageUpload(gIdx, role, e.target.files)
                              }
                              accept="image/png, image/jpeg, image/jpg"
                            />
                          </>
                        )}
                      </div>
                      <p className="text-[9px] text-center mt-1 uppercase text-slate-500">
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

            {/* Sizes */}
            {product_type === "sizes" && (
              <div className="lg:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-black text-slate-600 flex items-center gap-2">
                    <Ruler size={14} /> Sizes &amp; Stock
                  </h4>
                  <button
                    onClick={() => addSizeToGroup(gIdx)}
                    className="text-[10px] bg-white px-3 py-1.5 rounded-xl border font-bold text-indigo-600 border-indigo-100 hover:bg-indigo-50 shadow-sm"
                  >
                    + Add Size
                  </button>
                </div>
                <p className="text-[9px] text-slate-400 mb-3">
                  SKU auto-generates when Brand, Category Code, Product Code,
                  Color, and Size are selected
                </p>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {group.sizes.map((size, sIdx) => (
                    <div
                      key={size.id}
                      className="flex flex-col gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row gap-2">
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
                        <input
                          type="text"
                          inputMode="numeric"
                          min={1}
                          max={20}
                          placeholder="Stock"
                          value={size.stock || ""}
                          readOnly={loading}
                          onChange={(e) =>
                            handleStockChange(gIdx, sIdx, e.target.value)
                          }
                          className="w-full sm:w-24 p-2.5 bg-slate-50 rounded-lg text-xs font-bold border-2 border-transparent focus:border-indigo-500 outline-none"
                        />
                        {!loading && (
                          <button
                            onClick={() => removeSize(gIdx, sIdx)}
                            className="text-slate-400 hover:text-red-500 p-2"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
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
