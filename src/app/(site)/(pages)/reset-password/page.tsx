


"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiFetch } from "@/utils/api";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // قراءة التوكن من الرابط
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // منع الضغط المتكرر
    setLoading(true);

    try {
      const res = await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, newPassword }),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        toast.error(result.message || "Error resetting password");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    } finally {
      setLoading(false); // إعادة تفعيل الزر بعد انتهاء الطلب
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Reset Your Password
          </h2>

          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-medium py-3 px-6 rounded-lg transition duration-200 ${
              loading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 text-black hover:bg-blue-700"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            After resetting, you will be redirected to Sign In.
          </p>
        </form>
      </div>
    </>
  );
}