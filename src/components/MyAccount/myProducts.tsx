
"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { toast } from "react-hot-toast";

export default function MyProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null); // 👈 لتخزين المنتج المراد حذفه

  const handleDelete = async (id: string) => {
    setConfirmId(id); // 👈 نفتح مودال التأكيد
  };

  const confirmDelete = async () => {
    if (!confirmId) return;
    try {
      const res = await apiFetch(`/products/${confirmId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("🗑️ Product and images deleted");
        setProducts((prev) => prev.filter((p) => p._id !== confirmId));
      } else {
        toast.error("❌ Failed to delete product");
      }
    } catch (err) {
      
      toast.error("❌ Error while deleting product");
    } finally {
      setConfirmId(null); // إغلاق المودال بعد التنفيذ
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiFetch("/products/myProducts", { method: "GET" });
        const data = await res.json();
        if (data.ok) {
          setProducts(data.products);
        }
      } catch (err) {
        
        toast.error("❌ Failed to get products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10">
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>You have no products</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
  key={product._id}
  className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between"
>
  {/* على الهاتف: الصورة أولاً */}
  <div className="flex flex-col items-center md:items-start md:flex-row md:gap-4">
    {product.imgs?.previews?.[0] && (
      <img
        src={product.imgs.previews[0]}
        alt={product.title}
        className="w-24 h-24 object-cover rounded-md mb-3 md:mb-0"
      />
    )}

    {/* التفاصيل */}
    <div>
      <h3 className="font-semibold text-center md:text-left">{product.title}</h3>
      <p className="text-sm text-gray-800 text-center md:text-left">
        Price: {product.price} TND{" "}
        {product.discountedPrice && (
          <span className="text-green-600">
            (Discounted: {product.discountedPrice} TND)
          </span>
        )}
      </p>
      <p className="text-xs text-gray-500 text-center md:text-left">
        Reviews: {product.reviews}
      </p>
      <p className="text-xs text-gray-400 text-center md:text-left">
        {new Date(product.createdAt).toLocaleDateString()}
      </p>

      {/* زر الحذف يظهر تحت التفاصيل على الهاتف */}
      <div className="mt-3 md:hidden flex justify-center">
        <button
          onClick={() => handleDelete(product._id)}
          className="bg-red text-white px-4 py-2 rounded hover:bg-red-600 w-full"
        >
          Delete
        </button>
      </div>
    </div>
  </div>

  {/* على الشاشات الكبيرة: الزر بجانب الصورة */}
  <div className="hidden md:flex items-center gap-3">
    <button
      onClick={() => handleDelete(product._id)}
      className="bg-red text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</li>
          ))}
        </ul>
      )}

      {/* Confirm Modal */}
      {confirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1 bg-red text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}