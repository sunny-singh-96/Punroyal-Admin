"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  CheckSquare,
  Square,
  Package,
  Inbox,
  Loader2,
  X,
  Edit,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  View,
  Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { productsAPI } from "@/lib/integration/products";
import { commonAPI } from "@/lib/integration/common";
import DataGrid, { Header } from "@/components/admin/tables/dataTableWithGrid";
import { categoriesAPI } from "@/lib/integration/categories";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface BaseItem {
  _id: string;
  name: string;
}

interface ColorItem {
  _id: string;
  name: string;
  hex: string;
  color_code?: string;
}

interface CommonData {
  models: BaseItem[];
  materials: BaseItem[];
  sizes: BaseItem[];
  colors: ColorItem[];
}

interface FilterState {
  search: string;
  cat_id: string;
  product_type: string[];
  colors: string[];
  sizes: string[];
  materials: string[];
  models: string[];
  status: string;
  minPrice: string;
  maxPrice: string;
}

const EMPTY_FILTERS: FilterState = {
  search: "",
  cat_id: "",
  product_type: [],
  colors: [],
  sizes: [],
  materials: [],
  models: [],
  status: "",
  minPrice: "",
  maxPrice: "",
};

interface Category {
  _id: string;
  id?: string;
  title: string;
  name?: string;
  image: string;
}

interface Material {
  _id: string;
  name: string;
}

interface Color {
  _id: string;
  name: string;
  hex: string;
  status: string;
}
interface Media {
  _id: string;
  url: string;
  color_id: string;
  isPrimary: boolean;
  color_name: string;
}

interface VariantColor {
  _id: string;
  name: string;
  hex: string;
}

interface VariantSize {
  _id: string;
  name: string;
}

interface Variant {
  _id: string;
  stock: number;
  color: VariantColor;
  size: VariantSize;
}

export interface Model {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  title: string;
  product_type: "sizes" | "no_sizes";
  display_price: number;
  price: number;
  quantity: number;
  description: string;
  specifications: string;
  cat_id: string;
  status: boolean | number;
  video: string | null;
  video_link: string;
  primaryColorId: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  cat_ids?: string[];
  categories?: Category[];
  avgStars: number | null;
  model: Model;
  materials: Material[];
  colors: Color[];
  media: Media[];
  variants: Variant[];
  totalStock: number;
}

// All fields guaranteed after enrichment
interface EnrichedProduct extends Omit<Product, "category" | "status"> {
  id: string;
  name: string;
  category: string;
  base_price: number;
  sale_price: number;
  status: number;
  thumbnail: string | null;
  _colors: Color[];
  _materials: Material[];
  _variants: Variant[];
  _model: Model | null;
}

function getErrorMessage(e: unknown) {
  return e instanceof Error ? e.message : "An unknown error occurred";
}

// ─── Sidebar primitives ────────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-1 mb-1.5"
      >
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
          {title}
        </span>
        {open ? (
          <ChevronUp size={13} className="text-slate-400" />
        ) : (
          <ChevronDown size={13} className="text-slate-400" />
        )}
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}

function CheckItem({
  label,
  checked,
  onChange,
  dot,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  dot?: string;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer py-1 px-1 rounded-lg hover:bg-slate-50 group">
      <button type="button" onClick={onChange} className="shrink-0">
        {checked ? (
          <CheckSquare size={16} className="text-blue-600" />
        ) : (
          <Square
            size={16}
            className="text-slate-300 group-hover:text-slate-400"
          />
        )}
      </button>
      {dot && (
        <span
          className="w-3 h-3 rounded-full shrink-0 border border-black/10"
          style={{ background: dot }}
        />
      )}
      <span className="text-[13px] text-slate-700 leading-tight">{label}</span>
    </label>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  // ── state ──
  const [products, setProducts] = useState<EnrichedProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<BaseItem[]>([]);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const CATEGORY_PAGE_SIZE = 4;

  const [common, setCommon] = useState<CommonData>({
    models: [],
    materials: [],
    sizes: [],
    colors: [],
  });

  const searchParams = useSearchParams();
  const searchParam = searchParams?.get('search') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(() =>
    searchParam ? { ...EMPTY_FILTERS, search: searchParam } : EMPTY_FILTERS
  );
  const [pendingFilters, setPendingFilters] = useState<FilterState>(() =>
    searchParam ? { ...EMPTY_FILTERS, search: searchParam } : EMPTY_FILTERS
  );

  useEffect(() => {
    if (searchParam) {
      setAppliedFilters(prev => ({ ...prev, search: searchParam }));
      setPendingFilters(prev => ({ ...prev, search: searchParam }));
    }
  }, [searchParam]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // ── build API params ──────────────────────────────────────────────────────

  const buildParams = useCallback(
    (f: FilterState, page: number): Record<string, unknown> => {
      const p: Record<string, unknown> = { page, limit: itemsPerPage };
      if (f.search) p.search = f.search;
      if (f.cat_id) p.cat_id = f.cat_id;
      if (f.product_type.length) p.product_type = f.product_type;
      if (f.colors.length) p.colors = f.colors;
      if (f.sizes.length) p.sizes = f.sizes;
      if (f.models.length) p.models = f.models;
      if (f.materials.length) p.materials = f.materials;
      if (f.minPrice || f.maxPrice)
        p.price = `${f.minPrice || ""},${f.maxPrice || ""}`;
      if (f.status !== "") p.status = f.status === "1" ? true : false;
      p.isAdmin = "true";
      return p;
    },
    [],
  );

  // ── fetch products ────────────────────────────────────────────────────────

  const fetchProducts = useCallback(
    async (f: FilterState, page: number) => {
      setLoading(true);
      try {
        console.log("Fetching products with params:", f);
        let response = await productsAPI.getAll(buildParams(f, page));
        response = response?.data;
        if (response?.code === "OK") {
          const enriched: EnrichedProduct[] = (
            response?.data?.products || []
          ).map((p: Product) => {
            const primaryMedia =
              (p.media || []).find((m: Media) => m.isPrimary) ||
              p.media?.[0] ||
              null;
            return {
              ...p,
              id: p._id,
              name: p.title,
              category: Array.isArray(p.categories) && p.categories.length > 0
                ? p.categories.map((c: any) => c.title).filter(Boolean).join(", ")
                : (p.category?.title || "General"),
              base_price: p.price || 0,
              sale_price: p.display_price || p.price || 0,
              status: p.status === true || p.status === 1 ? 1 : 0,
              thumbnail: primaryMedia?.url ?? null,
              _colors: p.colors || [],
              _materials: p.materials || [],
              _variants: p.variants || [],
              _model: p.model || null,
            } as EnrichedProduct;
          });
          setProducts(enriched);
          setTotalRecords(
            response?.data?.total ??
              response?.data?.totalProducts ??
              enriched.length,
          );
        } else {
          toast.error(response?.message || "Failed to load products");
          setProducts([]);
          setTotalRecords(0);
        }
      } catch (e) {
        toast.error(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    },
    [buildParams],
  );

  // ── fetch categories ──────────────────────────────────────────────────────

  const fetchCategories = useCallback(async (page: number) => {
    setCategoryLoading(true);
    try {
      const res = await categoriesAPI.getAll({
        page,
        limit: CATEGORY_PAGE_SIZE,
      });
      const inner = res?.data?.data || res?.data || res;
      console.log("fetchCategories response:", res);
      const items: Category[] =
        inner?.categories ||
        inner?.data?.categories ||
        inner?.items ||
        (Array.isArray(inner) ? inner : []);
      const total: number =
        inner?.total ??
        inner?.totalRecords ??
        res?.totalRecords ??
        res?.data?.total ??
        items.length;
      const flat: BaseItem[] = items.map((item: Category) => ({
        _id: String(item._id || item.id || ""),
        name: item.title || item.name || "",
      }));
      setCategories((prev) => (page === 1 ? flat : [...prev, ...flat]));
      setCategoryTotal(total);
      setCategoryPage(page);
    } catch (e) {
      console.error("fetchCategories error:", e);
    } finally {
      setCategoryLoading(false);
    }
  }, []);

  const hasMoreCategories = categories.length < categoryTotal;

  const fetchCommon = useCallback(async () => {
    try {
      const res = await commonAPI.getAll();
      const raw = res?.data?.data;
      setCommon({
        models: raw?.models || [],
        materials: raw?.materials || [],
        sizes: raw?.sizes || [],
        colors: (raw?.colors || []).map((c: Color) => ({
          _id: String(c._id || ""),
          name: c.name || "",
          hex: c.hex || "",
          color_code: c.hex || "",
        })),
      });
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  }, []);

  useEffect(() => {
    fetchCategories(1);
    setTimeout(fetchCommon, 300);
  }, [fetchCommon, fetchCategories]);

  useEffect(() => {
    const ms = appliedFilters.search ? 400 : 0;
    const t = setTimeout(() => fetchProducts(appliedFilters, currentPage), ms);
    return () => clearTimeout(t);
  }, [appliedFilters, currentPage, fetchProducts]);

  // ── filter helpers ────────────────────────────────────────────────────────

  const togglePendingArr = (key: keyof FilterState, id: string) => {
    setPendingFilters((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(id) ? arr.filter((v) => v !== id) : [...arr, id],
      };
    });
  };

  const setPendingField = (key: keyof FilterState, value: string) => {
    setPendingFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    setSelectedProducts([]);
    setAppliedFilters({ ...pendingFilters });
  };

  const clearAll = () => {
    setCurrentPage(1);
    setSelectedProducts([]);
    setPendingFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
  };

  const handleSearchChange = (value: string) => {
    setPendingFilters((prev) => ({ ...prev, search: value }));
    setAppliedFilters((prev) => ({ ...prev, search: value }));
    setCurrentPage(1);
  };

  const activeBadge = (
    [
      appliedFilters.product_type.length,
      appliedFilters.colors.length,
      appliedFilters.sizes.length,
      appliedFilters.materials.length,
      appliedFilters.models.length,
      appliedFilters.cat_id ? 1 : 0,
      appliedFilters.status !== "" ? 1 : 0,
      appliedFilters.minPrice || appliedFilters.maxPrice ? 1 : 0,
    ] as number[]
  ).reduce((a, b) => a + b, 0);

  const pendingBadge = (
    [
      pendingFilters.product_type.length,
      pendingFilters.colors.length,
      pendingFilters.sizes.length,
      pendingFilters.materials.length,
      pendingFilters.models.length,
      pendingFilters.cat_id ? 1 : 0,
      pendingFilters.status !== "" ? 1 : 0,
      pendingFilters.minPrice || pendingFilters.maxPrice ? 1 : 0,
    ] as number[]
  ).reduce((a, b) => a + b, 0);

  const hasActive = activeBadge > 0 || !!appliedFilters.search;
  const hasPending =
    JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);

  const headers: Header<EnrichedProduct>[] = [
    {
      key: "select",
      label: "",
      render: (row) => (
        <button
          onClick={() =>
            setSelectedProducts((prev) =>
              prev.includes(row.id)
                ? prev.filter((id) => id !== row.id)
                : [...prev, row.id],
            )
          }
        >
          {selectedProducts.includes(row.id) ? (
            <CheckSquare size={16} className="text-blue-600" />
          ) : (
            <Square size={16} className="text-slate-300" />
          )}
        </button>
      ),
    },

    {
      key: "thumbnail",
      label: "",
      render: (row) => (
        <div
          className={`${viewMode === "table" ? "w-10 h-10" : "size-36"} rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200`}
        >
          {row.thumbnail ? (
            <img
              src={row.thumbnail}
              alt={row.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package size={18} className="text-slate-300" />
          )}
        </div>
      ),
    },

    {
      key: "name",
      label: "Product",
      sortable: true,
      render: (row) => (
        <div>
          <p
            className="font-semibold text-slate-800 max-w-[200px] truncate"
            title={row.name}
          >
            {row.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {(row._colors || []).slice(0, 5).map((c: Color) => (
              <span
                key={c._id}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                style={{ background: c.hex }}
              />
            ))}
            {(row._colors || []).length > 5 && (
              <span className="text-[9px] text-slate-400">
                +{row._colors.length - 5}
              </span>
            )}
          </div>
        </div>
      ),
    },

    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (row) => (
        <span className="text-[11px] font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
          {row.category}
        </span>
      ),
    },

    {
      key: "product_type",
      label: "Type",
      render: (row) => (
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
          {row.product_type === "sizes" ? "Readymade" : "Unstitched"}
        </span>
      ),
    },

    {
      key: "base_price",
      label: "Price",
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-800">₹{row.sale_price}</span>
          {row.sale_price < row.base_price && (
            <span className="text-[10px] text-slate-400 line-through ml-1">
              ₹{row.base_price}
            </span>
          )}
        </div>
      ),
    },

    {
      key: "totalStock",
      label: "Stock",
      render: (row) => {
        const stock =
          row.product_type === "sizes" && row.totalStock === 0
            ? row.quantity
            : row.totalStock;
        return (
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              stock === 0
                ? "bg-red-50 text-red-500"
                : stock < 10
                  ? "bg-amber-50 text-amber-600"
                  : "bg-green-50 text-green-700"
            }`}
          >
            {stock === 0 ? "Out" : stock}
          </span>
        );
      },
    },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${row.status === 1 ? "bg-green-500" : "bg-slate-300"}`}
          />
          <span className="text-[11px] font-semibold text-slate-600">
            {row.status === 1 ? "Live" : "Draft"}
          </span>
        </div>
      ),
    },

    {
      key: "_id",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1">
          {/* <button
            className="p-1.5 rounded-lg hover:bg-slate-100"
            title={row.status === 1 ? "Set Draft" : "Set Live"}
          >
            {row.status ? (
              <Eye size={15} className="text-green-600" />
            ) : (
              <EyeOff size={15} className="text-slate-400" />
            )}
          </button> */}
          <Link
            href={`/products/edit/${row._id}`}
            className="p-1.5 rounded-lg hover:bg-slate-100"
          >
            <Edit size={15} className="text-amber-500" />
          </Link>
          <Link
            href={`/products/view/${row._id}`}
            className="p-1.5 rounded-lg hover:bg-slate-100"
          >
            <Eye size={15} className="text-amber-500" />
          </Link>
          {/* <button className="p-1.5 rounded-lg hover:bg-slate-100">
            <Trash2 size={15} className="text-red-400" />
          </button> */}
        </div>
      ),
    },
  ];

  // ── Bulk Status Change ────────────────────────────────────────────────────────

  const bulkStatusChange = async (status: number) => {
    if (selectedProducts.length === 0) return;
    try {
      setLoading(true);
      const response = await productsAPI.bulkUpdateStatus(
        selectedProducts,
        status === 1 ? true : false,
      );
      const res = response?.data || response;
      if (res?.code === "OK") {
        toast.success(`Products marked as ${status === 1 ? "Live" : "Draft"}`);
        setProducts((prev) =>
          prev.map((product) =>
            selectedProducts.includes(product._id)
              ? { ...product, status }
              : product,
          ),
        );
        setSelectedProducts([]);
      } else {
        toast.error(res?.message || "Failed to update products");
      }
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  // ── Bulk Delete ───────────────────────────────────────────────────────────────

  const bulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedProducts.length} product(s)?`,
    );
    if (!confirmed) return;
    try {
      setLoading(true);
      const response = await productsAPI.bulkDelete(selectedProducts);
      const res = response?.data || response;
      if (res?.code === "OK") {
        toast.success("Products deleted successfully");
        setProducts((prev) =>
          prev.filter((product) => !selectedProducts.includes(product._id)),
        );
        setTotalRecords((prev) => prev - selectedProducts.length);
        setSelectedProducts([]);
      } else {
        toast.error(res?.message || "Failed to delete products");
      }
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Header ── */}
      <div className="px-6 md:px-8 pt-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Products</h1>
            <p className="text-sm text-slate-500 mt-1">
              {totalRecords} products{hasActive ? " · Filters active" : ""}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/products/create"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 shadow-sm"
            >
              <Plus size={15} /> Add Product
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-6 md:px-8 pb-8 max-w-[1600px] mx-auto flex gap-6 items-start">
        {/* ── Sidebar ── */}
        <aside
          className={`shrink-0 transition-all duration-300 overflow-hidden ${showFilters ? "w-64" : "w-0"}`}
        >
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sticky top-6 w-64">
            <div className="flex items-center justify-between mb-5">
              <span className="font-black text-slate-800 text-sm">Filters</span>
              {hasActive && (
                <button
                  onClick={clearAll}
                  className="text-[11px] font-bold text-red-500 hover:text-red-600"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category — single select */}
            <FilterSection title="Category">
              <div className="space-y-0.5">
                {categories.map((c) => (
                  <CheckItem
                    key={c._id}
                    label={c.name}
                    checked={pendingFilters.cat_id === c._id}
                    onChange={() =>
                      setPendingField(
                        "cat_id",
                        pendingFilters.cat_id === c._id ? "" : c._id,
                      )
                    }
                  />
                ))}

                {hasMoreCategories && (
                  <button
                    onClick={() => fetchCategories(categoryPage + 1)}
                    disabled={categoryLoading}
                    className="w-full mt-1.5 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {categoryLoading ? (
                      <>
                        <Loader2 size={11} className="animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <ChevronDown size={11} />
                        Show more ({categoryTotal - categories.length} more)
                      </>
                    )}
                  </button>
                )}

                {!hasMoreCategories && categoryTotal > CATEGORY_PAGE_SIZE && (
                  <p className="text-center text-[10px] text-slate-300 pt-1">
                    All categories loaded
                  </p>
                )}
              </div>
            </FilterSection>

            {/* Color — multi-select */}
            {common.colors.length > 0 && (
              <FilterSection title="Color">
                <div className="max-h-44 overflow-y-auto pr-1">
                  {common.colors.map((c) => (
                    <CheckItem
                      key={c._id}
                      label={c.name}
                      checked={pendingFilters.colors.includes(c._id)}
                      onChange={() => togglePendingArr("colors", c._id)}
                      dot={c.hex || c.color_code}
                    />
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Size — multi-select */}
            {common.sizes.length > 0 && (
              <FilterSection title="Size">
                <div className="max-h-44 overflow-y-auto pr-1">
                  {common.sizes.map((s) => (
                    <CheckItem
                      key={s._id}
                      label={s.name}
                      checked={pendingFilters.sizes.includes(s._id)}
                      onChange={() => togglePendingArr("sizes", s._id)}
                    />
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Material — multi-select */}
            {common.materials.length > 0 && (
              <FilterSection title="Material">
                <div className="max-h-44 overflow-y-auto pr-1">
                  {common.materials.map((m) => (
                    <CheckItem
                      key={m._id}
                      label={m.name}
                      checked={pendingFilters.materials.includes(m._id)}
                      onChange={() => togglePendingArr("materials", m._id)}
                    />
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Models — multi-select */}
            {common.models.length > 0 && (
              <FilterSection title="Models">
                <div className="max-h-44 overflow-y-auto pr-1">
                  {common.models.map((m) => (
                    <CheckItem
                      key={m._id}
                      label={m.name}
                      checked={pendingFilters.models.includes(m._id)}
                      onChange={() => togglePendingArr("models", m._id)}
                    />
                  ))}
                </div>
              </FilterSection>
            )}

            {/* Status — single select */}
            <FilterSection title="Status">
              {[
                { val: "", label: "All" },
                { val: "1", label: "Live" },
                { val: "0", label: "Draft" },
              ].map(({ val, label }) => (
                <label
                  key={val}
                  className="flex items-center gap-2 cursor-pointer py-1 px-1 rounded-lg hover:bg-slate-50 group"
                >
                  <button
                    type="button"
                    onClick={() => setPendingField("status", val)}
                    className="shrink-0"
                  >
                    {pendingFilters.status === val ? (
                      <CheckSquare size={16} className="text-blue-600" />
                    ) : (
                      <Square
                        size={16}
                        className="text-slate-300 group-hover:text-slate-400"
                      />
                    )}
                  </button>
                  <span className="text-[13px] text-slate-700">{label}</span>
                </label>
              ))}
            </FilterSection>

            {/* Price Range */}
            <FilterSection title="Price Range (₹)" defaultOpen={false}>
              <div className="flex gap-2 pt-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={pendingFilters.minPrice}
                  onChange={(e) =>
                    setPendingFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  className="w-1/2 p-2 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={pendingFilters.maxPrice}
                  onChange={(e) =>
                    setPendingFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  className="w-1/2 p-2 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </FilterSection>

            {/* ── Bottom buttons ── */}
            <div className="pt-3 space-y-2">
              <button
                onClick={applyFilters}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                  hasPending
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200"
                    : "bg-blue-100 text-blue-400 cursor-default"
                }`}
              >
                {hasPending
                  ? `Apply Filters${pendingBadge > 0 ? ` (${pendingBadge})` : ""}`
                  : "Filters Applied"}
              </button>
              <button
                onClick={clearAll}
                className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-200"
              >
                Clear All
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Search + filter toggle */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowFilters((f) => !f)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors shrink-0 ${
                showFilters
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeBadge > 0 && (
                <span className="ml-1 bg-blue-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {activeBadge}
                </span>
              )}
            </button>
            <div className="relative flex-1">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by name, ID, SKU…"
                value={pendingFilters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {pendingFilters.search && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X
                    size={14}
                    className="text-slate-400 hover:text-slate-600"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Bulk actions */}
          {selectedProducts.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckSquare size={16} className="text-blue-600" />
                <span className="text-sm font-bold text-blue-800">
                  {selectedProducts.length} selected
                </span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => bulkStatusChange(1)}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700"
                >
                  Set Live
                </button>
                <button
                  onClick={() => bulkStatusChange(0)}
                  className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold hover:bg-amber-600"
                >
                  Set Draft
                </button>
                <button
                  onClick={bulkDelete}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* DataGrid / empty state */}
          {!loading && products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
              <Inbox size={44} className="mx-auto text-slate-300 mb-3" />
              <h3 className="text-lg font-bold text-slate-700">
                No products found
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearAll}
                className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <DataGrid
              headers={headers}
              rows={products}
              totalRecords={totalRecords}
              page={currentPage}
              pageSize={itemsPerPage}
              onPageChange={setCurrentPage}
              loading={loading}
              searchEnable={false}
              setViewMode={setViewMode}
              viewMode={viewMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
