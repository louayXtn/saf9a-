

"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiFetch } from "@/utils/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  ShoppingBagIcon,
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Product } from "@/types/product";

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get("access_token");
  const Router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiFetch("/products/myOrders", { method: "GET" });
        if (!res.ok) {
          toast.error("❌ Failed to fetch products");
          setLoading(false);
          return;
        }
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        toast.error("❌ Error while fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await apiFetch(`/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        toast.success("🗑️ Product and images deleted");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error("❌ Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error while deleting product");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
        <ClockIcon className="w-8 h-8 md:w-10 md:h-10 animate-spin text-indigo-600 mb-2" />
        <p className="text-base md:text-lg font-semibold text-indigo-700">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="p-3 md:p-6 lg:p-8 w-full bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold flex items-center gap-2 md:gap-3 text-gray-800">
          <ShoppingBagIcon className="w-7 h-7 md:w-9 md:h-9 lg:w-10 lg:h-10 text-indigo-600" />
          My Orders
        </h1>
      </div>

      {/* Empty state */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-600 mt-12 md:mt-20">
          <XCircleIcon className="w-10 h-10 md:w-14 md:h-14 text-gray-400 mb-2 md:mb-3" />
          <p className="text-base md:text-lg lg:text-xl font-medium">
            There are no products.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-3 md:p-5 lg:p-6 shadow bg-white hover:shadow-lg transition transform hover:-translate-y-1"
            >
              {/* Thumbnails */}
              {product.imgs?.thumbnails?.length > 0 && (
                <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
                  {product.imgs.thumbnails.map((thumb: string, index: number) => (
                    <img
                      key={index}
                      src={thumb}
                      alt={`${product.title}-thumb-${index}`}
                      className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-lg border"
                    />
                  ))}
                </div>
              )}

              {/* Previews */}
              {product.imgs?.previews?.length > 0 && (
                <div className="flex gap-2 md:gap-3 mb-3 md:mb-4 flex-wrap">
                  {product.imgs.previews.map((preview: string, index: number) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`${product.title}-preview-${index}`}
                      className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-lg border"
                    />
                  ))}
                </div>
              )}

              {/* Title */}
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 md:mb-3 flex items-center gap-2">
                <TagIcon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-indigo-500" />
                {product.title}
              </h2>

              {/* Price */}
              <p className="flex items-center gap-1 md:gap-2 text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
                <CurrencyDollarIcon className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                Price:{" "}
                <span className="font-bold text-green-600 text-base md:text-lg">
                  {product.price}
                </span>
              </p>
              {product.discountedPrice && (
                <p className="text-sm md:text-base text-gray-700 mb-2">
                  Discounted Price:{" "}
                  <span className="font-bold text-green-600">
                    {product.discountedPrice}
                  </span>
                </p>
              )}

              {/* Category & description */}
              <p className="text-xs md:text-sm text-gray-700 mb-1">
                Category: {product.category}
              </p>
              {/* <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 md:line-clamp-none">
                {product.description}
              </p> */}
              {/* createdAt */}
              <p className="text-xs md:text-sm text-gray-500 mb-2">
                Created At:{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>

              {/* Status badge */}
              <div className="flex items-center gap-2 mb-2">
                {product.status === "approved" && (
                  <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                )}
                {product.status === "pending" && (
                  <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                )}
                {product.status === "rejected" && (
                  <XCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                )}
                <span
                  className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-semibold ${
                    product.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : product.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.status}
                </span>
              </div>

              {/* Rejection reason */}
              {product.status === "rejected" && (
                <p className="text-red-500 text-xs md:text-sm mb-2">
                  Rejection Reason: {product.rejectionReason}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 md:gap-3 mt-2 md:mt-3">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 border-gray-700 px-2 md:px-3 py-1 md:py-2 rounded hover:bg-gray-200 border transition text-sm md:text-base"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}