"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Loader2,
  Edit,
  Instagram,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  Maximize2,
  Weight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

import toast from "react-hot-toast";
import { productsAPI } from "@/lib/integration";
import { handleImageError } from "@/lib/imageHelper";
import { storageUtils } from "@/lib/storage";
import Image from "next/image";
import Link from "next/link";

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
}

interface ProductVariant {
  _id: string;
  stock: number;
  color: {
    _id: string;
    name: string;
    hex: string;
  };
  size?: {
    _id: string;
    name: string;
  };
}

interface ProductData {
  _id: string;
  title: string;
  product_type: string;
  display_price: number;
  price: number;
  quantity: number;
  description: string;
  specifications: string;
  weight: number;
  height: number;
  breadth: number;
  length: number;
  cat_id: string;
  status: boolean;
  video: string;
  video_link: string;
  primaryColorId: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    _id: string;
    title: string;
    image: string;
  };
  categories?: Array<{
    _id: string;
    title: string;
    image?: string;
  }>;
  model: {
    _id: string;
    name: string;
  };
  materials: Array<{
    _id: string;
    name: string;
  }>;
  colors: Array<{
    _id: string;
    color_name: string;
    color_hex: string;
    color_status: string;
  }>;
  media: Array<{
    _id: string;
    url: string;
    color_id: string;
    isPrimary: boolean;
    color_name: string;
  }>;
  variants: ProductVariant[];
  totalStock: number;
}

interface ApiResponse {
  code: string;
  message: string;  
  product: ProductData;
  productImages: ProductImage[];
}

export default function ProductViewPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (!selectedColor) return [];
    return productImages.filter((item) => item.color_id === selectedColor);
  }, [productImages, selectedColor]);

  useEffect(() => {
    if (!productId) {
      toast.error("Product ID not found");
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.get(productId);
        const apiData = response.data as ApiResponse;

        if (response.code === "OK") {
          const productData = apiData.product;
          const images = apiData.productImages;

          setProduct(productData);
          setProductImages(images);

          const initialColor =
            productData.primaryColorId || productData.colors[0]?._id;
          setSelectedColor(initialColor || null);
          setSelectedImageIndex(0);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
    setSelectedImageIndex(0);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1,
    );
  };

  const currentUser = storageUtils.getUser();
  const isInfluencer = currentUser?.role === "influencer";

  const handleEdit = () => {
    if (isInfluencer) {
      toast.error("Access restricted: Influencers can only view product details.");
      return;
    }
    router.push(`/products/edit/${productId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Product not found</p>
        </div>
      </div>
    );
  }

  const selectedColorData = product.colors.find(
    (color) => color._id === selectedColor,
  );
  const currentImage =
    filteredImages.length > 0 ? filteredImages[selectedImageIndex]?.url : null;
  const priceDiscount = Math.round(
    ((product.price - product.display_price) / product.price) * 100,
  );
  const lowStock = product.quantity < 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Professional Status Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                product.status ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="text-sm font-semibold text-slate-700">
              {product.status ? "Active Product" : "Inactive Product"}
            </span>
          </div>
          <div className="text-xs text-slate-500">ID: {productId}</div>
          {!isInfluencer && (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg transition-all hover:shadow-md font-medium text-sm"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link
              href={isInfluencer ? "/influencer/products" : "/products"}
              className="hover:text-blue-600 transition flex items-center gap-1 font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{isInfluencer ? "My Products" : "Products"}</span>
            </Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-slate-700 font-semibold">{product.title}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN - Video & Images */}
          <div className="space-y-6">
            {/* Main Video Player */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full bg-black aspect-video overflow-hidden flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={product.video}
                  className="w-full h-full object-cover"
                  onError={(e) => console.error("Video error:", e)}
                  onClick={togglePlay}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                  }`}
                >
                  <div className="bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-5 transition-all duration-200 hover:scale-110 shadow-2xl">
                    {isPlaying ? (
                      <Pause className="w-10 h-10 text-white" fill="white" />
                    ) : (
                      <Play className="w-10 h-10 text-white translate-x-0.5" fill="white" />
                    )}
                  </div>
                </button>

                {/* Open in New Tab */}
                <a
                  href={product.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 hover:scale-105 z-10"
                >
                  <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                  Open
                </a>
              </div>
              {product.video_link && (
                <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Instagram className="w-5 h-5 text-pink-600" />
                    </div>
                    <a
                      href={product.video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 truncate hover:underline transition-colors"
                    >
                      {product.video_link}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Product Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 space-y-6">
              <div className="border-b border-slate-200 pb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-slate-500 text-sm">
                  SKU ID: {productId.slice(-8).toUpperCase()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      Type
                    </p>
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    {product.product_type === "sizes"
                      ? "Standard"
                      : "Free Size"}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                      {product.categories && product.categories.length > 1 ? "Categories" : "Category"}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-slate-900">
                    {product.categories && product.categories.length > 0
                      ? product.categories.map((c) => c.title).join(", ")
                      : (product.category?.title || "N/A")}
                  </p>
                </div>

                {product.model && (
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                        Model
                      </p>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      {product.model.name}
                    </p>
                  </div>
                )}

                {product.materials && product.materials.length > 0 && (
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Weight className="w-4 h-4 text-amber-600" />
                      <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                        Material
                      </p>
                    </div>
                    <p className="text-lg font-bold text-slate-900">
                      {product.materials.map((m) => m.name).join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Pricing Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg border border-indigo-500 p-8 text-white">
                <p className="text-indigo-100 text-sm font-semibold uppercase tracking-wide mb-4">
                  Pricing
                </p>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-sm text-indigo-100 mb-1">
                        Display Price
                      </p>
                      <p className="text-4xl font-bold">
                        ₹{product.display_price}
                      </p>
                    </div>
                    {priceDiscount > 0 && (
                      <div className="text-right">
                        <div className="inline-block bg-white/20 backdrop-blur text-white px-3 py-1 rounded-lg font-semibold">
                          {priceDiscount}% OFF
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="pt-4 border-t border-indigo-400">
                    <p className="text-indigo-100 text-sm mb-1">
                      Original Price
                    </p>
                    <p className="text-2xl font-semibold line-through text-indigo-200">
                      ₹{product.price}
                    </p>
                  </div>
                  {product.product_type === "no_sizes" ? (
                    <div className="pt-4 border-t border-indigo-400 flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100 text-sm mb-1">
                          Available Stock
                        </p>
                        <p className="text-2xl font-bold">
                          {product.quantity} units
                        </p>
                      </div>
                      {lowStock && (
                        <div className="text-right">
                          <div className="inline-block bg-yellow-400/20 backdrop-blur text-yellow-100 px-3 py-1 rounded-lg text-sm font-semibold">
                            Low Stock
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-12 grid grid-cols-1 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Description
                </h2>
                {product.description ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    className="prose prose-sm max-w-none text-slate-700 leading-relaxed"
                  />
                ) : (
                  <p className="text-slate-500 italic">
                    No description provided
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Color Selection */}
            {product.product_type === "sizes" && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Available Sizes
                    </h2>
                    <p className="text-xs text-slate-500">
                      {selectedColorData
                        ? `Showing sizes for ${selectedColorData.color_name}`
                        : "Select a color to see sizes"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {product.variants
                    .filter((variant) => variant.color?._id === selectedColor)
                    .map((variant) => (
                      <div
                        key={variant._id}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Size
                          </span>
                          <div
                            className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                              variant.stock <= 2
                                ? "bg-red-100 text-red-700"
                                : variant.stock <= 10
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {variant.stock} pcs
                          </div>
                        </div>
                        <div className="mt-3 text-2xl font-bold text-slate-900">
                          {variant.size?.name}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Select Color
                </h2>
                <p className="text-sm text-slate-500">
                  {filteredImages.length} image
                  {filteredImages.length !== 1 ? "s" : ""} available
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color._id}
                    onClick={() => handleColorChange(color._id)}
                    className={`relative group transition-all duration-200 ${
                      selectedColor === color._id ? "scale-105" : ""
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl transition-all duration-200 ${
                        selectedColor === color._id
                          ? "ring-2 ring-offset-2 ring-indigo-600 shadow-lg"
                          : "ring-1 ring-slate-200"
                      }`}
                    />
                    <div className="relative">
                      <div
                        className="w-16 h-16 rounded-xl shadow-md transition-all duration-200 border-4 border-white hover:shadow-lg"
                        style={{ backgroundColor: color.color_hex }}
                        title={color.color_name}
                      />
                      {selectedColor === color._id && (
                        <CheckCircle2 className="absolute top-1 right-1 w-5 h-5 text-indigo-600 bg-white rounded-full" />
                      )}
                    </div>
                    <p
                      className={`text-xs font-semibold text-center mt-2 transition-colors ${
                        selectedColor === color._id
                          ? "text-indigo-600"
                          : "text-slate-600"
                      }`}
                    >
                      {color.color_name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 mb-1">
                  Product Images
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500">
                    {selectedColorData
                      ? `${selectedColorData.color_name} - Image ${selectedImageIndex + 1} of ${filteredImages.length}`
                      : "Select a color to view images"}
                  </p>
                </div>
              </div>

              {filteredImages.length > 0 ? (
                <div className="space-y-4">
                  <div className="relative w-full bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl overflow-hidden aspect-square border-2 border-slate-200 group">
                    <Image
                      src={currentImage || ""}
                      alt={`${selectedColorData?.color_name} product view`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={handleImageError}
                      priority
                    />

                    {filteredImages.length > 1 && (
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    )}

                    {filteredImages.length > 1 && (
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}

                    {filteredImages.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {selectedImageIndex + 1}/{filteredImages.length}
                      </div>
                    )}
                  </div>

                  {filteredImages.length > 1 && (
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                        All Views
                      </p>
                      <div className="grid grid-cols-4 gap-3">
                        {filteredImages.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all duration-200 flex-shrink-0 ${
                              selectedImageIndex === index
                                ? "border-indigo-600 ring-2 ring-indigo-300 shadow-md"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                            title={`View ${index + 1}`}
                          >
                            <Image
                              src={image.url}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-300"
                              onError={handleImageError}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                  <div className="text-center">
                    <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-500 font-medium">
                      No images available
                    </p>
                    <p className="text-slate-400 text-sm">for this color</p>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Specifications
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-4 h-4 text-slate-600" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Length
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {product.length}
                  </p>
                  <p className="text-xs text-slate-500">cm</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-4 h-4 text-slate-600" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Breadth
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {product.breadth}
                  </p>
                  <p className="text-xs text-slate-500">cm</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize2 className="w-4 h-4 text-slate-600" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Height
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {product.height}
                  </p>
                  <p className="text-xs text-slate-500">cm</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="w-4 h-4 text-slate-600" />
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      Weight
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {product.weight}
                  </p>
                  <p className="text-xs text-slate-500">kg</p>
                </div>
              </div>

              {product.specifications && (
                <div className="border-t border-slate-200 pt-6">
                  <p className="text-sm font-semibold text-slate-900 mb-4">
                    Details
                  </p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.specifications,
                    }}
                    className="text-slate-700 text-sm leading-relaxed prose prose-sm max-w-none"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
