

// "use client";

// import Link from "next/link";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { apiFetch } from "@/utils/api";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { setUser } from "@/redux/features/auth-slice";

// export default function SignupForm() {
//   const dispatch = useDispatch<AppDispatch>();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     const token = Cookies.get("access_token");
//     if (token) {
//       toast("You are already signed in.", { type: "info" });
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 1500);
//     }
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };


//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   try {
//     const res = await apiFetch("/auth/register", {
//       method: "POST",
//       body: JSON.stringify(formData),
//     });

//     const result = await res.json();
//     console.log("رد السيرفر:", result);

//     if (res.ok) {
//       // ما تحتاج تخزن الكوكيز بنفسك، السيرفر خزّنها
//       // خزّن بيانات المستخدم في الـ Redux
//       dispatch(setUser(result));

//       toast.success("Account created successfully 🎉");

//       setFormData({
//         first_name: "",
//         last_name: "",
//         email: "",
//         password: "",
//       });

//       window.location.href = "/";
//     } else {
//       toast.error(`${result.message || "Error occurred during registration."}`);
//     }
//   } catch (error) {
//     toast.error("Error: Try connecting again later.");
//     console.error("خطأ في الاتصال:", error);
//   }
// };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       <form onSubmit={handleSubmit}>
//         <div className="mb-5">
//           <label htmlFor="first_name" className="block mb-2.5">
//             First Name <span className="text-red">*</span>
//           </label>
//           <input
//             type="text"
//             name="first_name"
//             id="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//             className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="last_name" className="block mb-2.5">
//             Last Name <span className="text-red">*</span>
//           </label>
//           <input
//             type="text"
//             name="last_name"
//             id="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//             className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="email" className="block mb-2.5">
//             Email Address <span className="text-red">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="password" className="block mb-2.5">
//             Password <span className="text-red">*</span>
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             value={formData.password}
//             onChange={handleChange}
//             className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
//         >
//           Create Account
//         </button>

//         <p className="text-center mt-6">
//           Already have an account?
//           <Link href="/signin" className="text-dark ease-out duration-200 hover:text-blue pl-2">
//             Sign in Now
//           </Link>
//         </p>
//       </form>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { apiFetch } from "@/utils/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/features/auth-slice";

export default function SignupForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      toast("You are already signed in.", { type: "info" });
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // تحقق من تطابق كلمة المرور
  if (formData.password !== formData.confirmPassword) {
    toast.error("كلمة المرور وتأكيدها غير متطابقين ❌");
    return;
  }

  setLoading(true);

  try {
    // نرسل فقط كلمة المرور للـ backend
    const res = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password, // فقط هذا
      }),
    });

    const result = await res.json();
    console.log("رد السيرفر:", result);

    if (res.ok) {
      dispatch(setUser(result));
      toast.success("تم إنشاء الحساب بنجاح 🎉");
      window.location.href = "/";
    } else {
      toast.error(result.message || "حدث خطأ أثناء التسجيل.");
    }
  } catch (error) {
    toast.error("خطأ في الاتصال، حاول لاحقاً.");
    console.error("خطأ:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="first_name" className="block mb-2.5">
            First Name <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="last_name" className="block mb-2.5">
            Last Name <span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2.5">
            Email Address <span className="text-red">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2.5">
            Password <span className="text-red">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block mb-2.5">
            Confirm Password <span className="text-red">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center font-medium text-white py-3 px-6 rounded-lg ease-out duration-200 mt-7.5 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-dark hover:bg-blue"
          }`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center mt-6">
          Already have an account?
          <Link
            href="/signin"
            className="text-dark ease-out duration-200 hover:text-blue pl-2"
          >
            Sign in Now
          </Link>
        </p>
      </form>
    </>
  );
}