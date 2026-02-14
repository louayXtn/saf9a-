"use client";
import React, { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api";
import { toast } from "react-hot-toast";
import { ClockIcon } from "@heroicons/react/24/outline";

import { useRouter } from "next/navigation";
type OrderItem = {
  productId: string;
  sellerId: string;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
previewImg?: string;
};

type Order = {
  _id: string;
  items: OrderItem[];
  customerInfo: {
    name: string;
    address: string;
    phone: string;
  };
  createdAt: string;
};


const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
 
  // جلب الطلبات من الـ backend
  const fetchOrders = async () => {
    try {
      const res = await apiFetch("/api/orders/seller", {
        method: "GET",
      });
      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      } else {
        toast.error(data.error || " Failed to fetch orders");
        setTimeout(() => {
        router.push("/signin");
      }, 2000);
      }
    } catch (error) {
      toast.error("error to get orders ");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteOrder = async (orderId: string) => {
  try {
    const res = await apiFetch(`/api/orders/${orderId}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Order deleted successfully!");
      // تحديث القائمة بعد الحذف
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } else {
      toast.error(data.error || "Failed to delete order");
    }
  } catch (error) {
    
    toast.error("Unexpected error");
  }
};
  useEffect(() => {
    fetchOrders();
  }, []);
  if (loading)
    return (
      <div className="flex mt-50 md:mt-35 flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
        <ClockIcon className="w-10 h-10 animate-spin text-indigo-600 mb-2" />
        <p className="text-lg font-semibold text-indigo-700"> loading...</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 mt-50 lg:mt-20 ">
  <h1 className="text-2xl font-bold mb-6">📦 my orders</h1>

  {loading ? (
    <p className="text-gray-600">loading..</p>
  ) : orders.length === 0 ? (
    <p className="text-gray-600">No orders available yet.</p>
  ) : (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300"
        >
          {/* بيانات العميل */}
          <p className="text-sm text-gray-700 font-medium mb-1">
            👤 {order.customerInfo.name}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            📍 {order.customerInfo.address}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            📞 {order.customerInfo.phone}
          </p>
          <p className="text-xs text-gray-500">
            ⏰ {new Date(order.createdAt).toLocaleString()}
          </p>

          {/* المنتجات */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-dark">🛒 orders:</h3>
            <ul className="space-y-2">
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between border-b pb-2 text-sm"
                >
                  <div className="flex items-center gap-3">
                    {item.previewImg && (
                      <img
                        src={item.previewImg}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-md shadow-sm"
                      />
                    )}
                    <span className="font-medium text-gray-800">
                      {item.title} × {item.quantity}
                    </span>
                  </div>
                  {/* <span className="font-semibold text-blue-600">
                    ${item.discountedPrice * item.quantity}
                  </span> */}
                  <span className="font-semibold text-blue-600">
  ${ (item.discountedPrice ?? item.price) * item.quantity }
</span>
                </li>
              ))}
            </ul>
          </div>

          {/* الأزرار */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleDeleteOrder(order._id)}
              className="flex-1 bg-red-500 text-black py-2 px-3 rounded-md font-medium hover:bg-red-600 transition-colors duration-300"
            >
              Delete
            </button>
            <button
              onClick={() => handleDeleteOrder(order._id)}
              className="flex-1 bg-green-500 text-black py-2 px-3 rounded-md font-medium hover:bg-green-600 transition-colors duration-300"
            >
              Product Selling
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default OrdersPage;