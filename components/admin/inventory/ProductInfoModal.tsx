"use client";

type Product = {
  _id: string;
  title: string;
  price: number;
  totalStock: number;
  product_type: string;
  status: boolean;
  model?: { name: string };
  materials?: { name: string }[];
  colors?: {
    _id: string;
    color_name: string;
    color_hex: string;
  }[];
  variants?: {
    _id: string;
    stock: number;
    size?: { name: string };
    color?: { name: string };
  }[];
};

type ProductModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ProductInfoModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps) => {
  if (!isOpen || !product) return null;

  const materials = product.materials || [];
  const colors = product.colors || [];
  const variants = product.variants || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-2xl p-6 md:p-7 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <h2 className="text-xl font-semibold text-slate-800 leading-tight">
            {product.title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Top Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm">
          
          <div>
            <p className="text-slate-500">Price</p>
            <p className="font-medium text-slate-800">₹{product.price}</p>
          </div>

          <div>
            <p className="text-slate-500">Stock</p>
            <p className="font-medium text-slate-800">{product.totalStock}</p>
          </div>

          <div>
            <p className="text-slate-500">Type</p>
            <p className="font-medium text-slate-800 capitalize">
              {product.product_type}
            </p>
          </div>

          <div>
            <p className="text-slate-500">Status</p>
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                product.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.status ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Model */}
        {product.model?.name && (
          <div className="mb-5">
            <p className="text-sm text-slate-500 mb-1">Model</p>
            <div className="bg-slate-100 rounded-lg px-4 py-2 text-sm text-slate-700">
              {product.model.name}
            </div>
          </div>
        )}

        {/* Materials */}
        {materials.length > 0 && (
          <div className="mb-5">
            <p className="text-sm text-slate-500 mb-1">Materials</p>
            <div className="bg-slate-100 rounded-lg px-4 py-2 text-sm text-slate-700">
              {materials.map((m) => m.name).join(", ")}
            </div>
          </div>
        )}

        {/* Colors */}
        {colors.length > 0 && (
          <div className="mb-5">
            <p className="text-sm text-slate-500 mb-2">Colors</p>
            <div className="flex gap-3 flex-wrap">
              {colors.map((c) => (
                <div
                  key={c._id}
                  className="w-8 h-8 rounded-full border shadow-sm"
                  style={{ backgroundColor: c.color_hex }}
                  title={c.color_name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Variants */}
        {product.product_type === "sizes" && variants.length > 0 && (
          <div className="mb-5">
            <p className="text-sm text-slate-500 mb-2">Variants</p>

            <div className="space-y-2">
              {variants.map((v) => (
                <div
                  key={v._id}
                  className="flex justify-between items-center bg-slate-100 px-4 py-2.5 rounded-lg text-sm"
                >
                  <span className="text-slate-700">
                    {v.size?.name || "-"} / {v.color?.name || "-"}
                  </span>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      v.stock === 0
                        ? "bg-red-100 text-red-600"
                        : v.stock <= 5
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {v.stock}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};