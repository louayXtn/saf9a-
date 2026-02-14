"use client";

import React, { useEffect, useState } from "react";
import { apiFetch } from "@/utils/api"; 
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "../../../../utils/auth"
interface Message {
  _id: string;
  first_name: string;
  last_name: string;
  subject: string;
  phone: string;
  message: string;
  createdAt: string;
}

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const User = getUserFromToken();
  // جلب الرسائل عند تحميل الصفحة
  useEffect(() => {
    if (!User?.isAdmin) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
  const fetchMessages = async () => {
    setLoading(true);
    try {
      // apiFetch بيرجع Response
      const res = await apiFetch("/contact/messages", { method: "GET" });

      // لازم نفك البيانات من الـ body
      const data = await res.json();


      // تأكد إنها مصفوفة
      setMessages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error("❌ فشل في جلب الرسائل");
      setMessages([]); // fallback
    } finally {
      setLoading(false);
    }
  };
  fetchMessages();
}, []);

  // حذف رسالة
  const handleDelete = async (id: string) => {
  try {
    const res = await apiFetch(`/contact/messages/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (data.success) {
      toast.success("✅ تم حذف الرسالة");
      setMessages(messages.filter((m) => m._id !== id));
    } else {
      toast.error(data.error || "❌ فشل في حذف الرسالة");
    }
  } catch (err: any) {
    toast.error("❌ خطأ أثناء الحذف");
  }
};

  return (
    <div className=" mt-50 md:mt-35 p-6">
      <h1 className="text-2xl font-bold mb-0">📩 messages  </h1>

      {loading ? (
        <p>loading ...</p>
      ) : messages.length === 0 ? (
        <p>there are no messages  </p>
      ) : (
       

        <ul className="space-y-4">
          {messages.map((msg) => (
            <li
              key={msg._id}
              className="border rounded-md p-4 mt-50 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">
                  {msg.first_name} {msg.last_name}
                </p>
                <p className="text-sm text-gray-600">📞 {msg.phone}</p>
                <p className="text-sm text-gray-600">📝 {msg.subject}</p>
                <p className="mt-2">{msg.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(msg._id)}
                className="bg-red text-white px-3 py-1 !rounded-md hover:bg-red-600"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesPage;