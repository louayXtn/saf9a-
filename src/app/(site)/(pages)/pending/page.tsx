"use client";
import { apiFetch } from "@/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ShoppingBagIcon,
  TagIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Product } from "@/types/product";

import { getUserFromToken } from "../../../../utils/auth"


import { useRouter } from "next/navigation";
// interface Product {

export default function PendingProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const User = getUserFromToken();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
 /*  useEffect(() => {
    if (!User?.isAdmin) {
      router.push("/");
    }
  }, []); */

  // جلب المنتجات المعلقة
  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await apiFetch("/products/pending");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        toast.error("❌ خطأ في جلب المنتجات المعلقة");
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  // قبول المنتج
  // const handleApprove = async (id: string) => {
  //   try {
  //     const res = await apiFetch(`products/${id}/approve`, {
  //       method: "PATCH",
  //     });
  //     const data = await res.json();
  //     if (data.ok) {
  //       toast.success("✅ تم قبول المنتج");
  //       setProducts(prev => prev.filter(p => p._id !== id));
  //     } else {
  //       toast.error("❌ فشل قبول المنتج");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("❌ خطأ أثناء قبول المنتج");
  //   }
  // };
  // state لحفظ المراجعات
const [reviews, setReviews] = useState<{ [key: string]: string }>({});

const handleReviewChange = (id: string, value: string) => {
  setReviews(prev => ({ ...prev, [id]: value }));
};
const handleApprove = async (id: string) => {
  const reviewsText = reviews[id];
  if (!reviewsText) {
    toast.error("⚠️ الرجاء كتابة تقييم رقمي قبل القبول");
    return;
  }

  const reviewNumber = Number(reviewsText); // تحويل النص إلى رقم
  if (isNaN(reviewNumber)) {
    toast.error("⚠️ يجب إدخال رقم صحيح");
    return;
  }

  try {
    const res = await apiFetch(`/products/${id}/approve`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviews: reviewNumber }), // إرسال الرقم
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("✅ تم قبول المنتج مع التقييم");
      setProducts(prev => prev.filter(p => p._id !== id));
    } else {
      toast.error("❌ فشل قبول المنتج");
    }
  } catch (err) {
    console.error(err);
    toast.error("❌ خطأ أثناء قبول المنتج");
  }
};
  // رفض المنتج
  const handleReject = async (id: string) => {
    const reason = prompt("أدخل سبب الرفض:");
    if (!reason) return;

    try {
      const res = await apiFetch(`/products/${id}/reject`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      if (data.ok) {
        toast.success("🚫 تم رفض المنتج");
        setProducts(prev => prev.filter(p => p._id !== id));
      } else {
        toast.error("❌ فشل رفض المنتج");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ خطأ أثناء رفض المنتج");
    }
  };

  if (loading) return <p>⏳ loading ...</p>;

  return (
    <div className="p-6 mt-50 md:mt-35">
      <h2 className="text-2xl font-bold mb-4">🕒 pending products</h2>
      {products.length === 0 ? (
        <p>there is no pending products    </p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
    <div
      key={product._id}
      className="border rounded-2xl p-4 shadow-lg bg-white hover:shadow-xl transition transform hover:-translate-y-1"
    >
      
      {/* Thumbnails */}
      {product.imgs?.thumbnails?.length > 0 && (
        <div className="flex gap-3 mb-4 flex-wrap">
          {product.imgs.thumbnails.map((thumb: string, index: number) => (
            <img
              key={index}
              src={thumb}
              alt={`${product.title}-thumb-${index}`}
              className="w-32 h-32 object-contain rounded-xl border"
            />
          ))}
        </div>
      )}

      {/* Previews */}
      {product.imgs?.previews?.length > 0 && (
        <div className="flex gap-3 mb-4 flex-wrap">
          {product.imgs.previews.map((preview: string, index: number) => (
            <img
              key={index}
              src={preview}
              alt={`${product.title}-preview-${index}`}
              className="w-32 h-32 object-contain rounded-xl border"
            />
          ))}
        </div>
      
      )}

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <TagIcon className="w-6 h-6 text-indigo-500" />
        {product.title}
      </h2>

      {/* Price */}
      <p className="flex items-center gap-2 text-gray-700 mb-1">
        <CurrencyDollarIcon className="w-5 h-5 text-green-500" />
        price:{" "}
        <span className="font-bold text-lg text-green-600">
          {product.price}
        </span>
      </p>
      {product.discountedPrice && (
        <p className="text-gray-700 mb-2">
          discounted price:{" "}
          <span className="font-bold text-green-600">
            {product.discountedPrice}
          </span>
        </p>
      )}

      {/* Category & description */}
      <p className="text-gray-700 mb-1">category: {product.category}</p>
      <p className="text-gray-600 mb-3">description: {product.description}</p>
      <p className="text-gray-600 mb-3">contact info: {product.contactInfo}</p>

      {/* Status badge */}
      <div className="flex items-center gap-2 mb-2">
        {product.status === "approved" && (
          <CheckCircleIcon className="w-5 h-5 text-green-600" />
        )}
        {product.status === "pending" && (
          <ClockIcon className="w-5 h-5 text-yellow-500" />
        )}
        {product.status === "rejected" && (
          <XCircleIcon className="w-5 h-5 text-red-600" />
        )}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
        <p className="text-red-500 text-sm mb-2">
          rejected reason: {product.rejectionReason}
        </p>
      )}

      {/* Created by */}
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
        <UserCircleIcon className="w-5 h-5 text-gray-400" />
        create by: {product.createdBy.first_name}{" "}
        {product.createdBy.last_name} ({product.createdBy.email})
      </div>
      <div className="flex gap-3 mt-3">
                {/* <button
                  onClick={() => handleApprove(product._id)}
                  className="bg-green-600 text-black px-4 py-2 rounded"
                >
                  ✅ accept
                </button> */}
                {/* إدخال المراجعة */}
<div className="flex-1 mt-4">
  <input
    type="text"
    placeholder="reviews .."
    value={reviews[product._id] || ""}
    onChange={(e) => handleReviewChange(product._id, e.target.value)}
    className="border rounded px-3 py-2 w-full mb-2"
  />
  {/* <br /> */}
  <button
    onClick={() => handleApprove(product._id)}
    className="bg-green text-white px-3 py-1 !rounded-md"
  >
    ✅ accept
  </button>
</div>
                <div className="relative mt-4 flex-1">
                  <button
                  onClick={() => handleReject(product._id)}
                  className="!bg-red absolute bottom-0 left-0 text-white px-4 py-1 !rounded-md"
                >
                  🚫 reject
                </button>
                </div>
              </div>
    </div>
    
  ))}
  
        </ul>
      )}
    </div>
  );
}