// "use client";

// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { apiFetch } from "@/utils/api";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await apiFetch("/auth/forgot-password", {
//         method: "POST",
//         body: JSON.stringify({ email }),
//       });
//       const result = await res.json();

//       if (res.ok) {
//         toast.success(result.message);
//       } else {
//         toast.error(result.message || "Error sending reset link");
//       }
//     } catch (err) {
//       toast.error("Server error");
//       console.error(err);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <form onSubmit={handleSubmit} className="mt-50">
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Send reset link</button>
//       </form>
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiFetch } from "@/utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // منع الضغط المتكرر
    setLoading(true);

    try {
      const res = await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.message);
        setTimeout(() => {
          window.location.href = "/signin";
        }, 2000);
      } else {
        toast.error(result.message || "Error sending reset link");
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
      <div className="flex items-center mt-20 justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Forgot Password
          </h2>

          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter your email address and we’ll send you a link to reset your password.
          </p>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Remembered your password?{" "}
            <a
              href="/signin"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </>
  );
}