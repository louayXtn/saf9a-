// "use client";

// import React, { useState } from "react";
// import Cookies from "js-cookie";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { apiFetch } from "@/utils/api"; // تأكد من وجود هذا الملف
// import { useEffect } from "react";

// export default function SigninForm() {
  

//   // useEffect(() => {
//   //   const token = Cookies.get("access_token");
//   //   if (token) {
//   //     toast("You are already signed in.", { type: "info" });
//   //     setTimeout(() => {
//   //       window.location.href = "/";; 
//   //     }, 1500); // 1.5 ثانية
//   //   }
//   // }, []);
  
// useEffect(() => {
//   const token = Cookies.get("access_token");
//   if (token) {
//     // تحقق من صلاحية التوكن عبر الـ API
//     apiFetch("/auth/refresh", { method: "GET" })
//       .then((res) => {
//         if (!res.ok) throw new Error("Invalid token");
//         return res.json();
//       })
//       .then((data) => {
//         // إذا رجع بيانات صحيحة → رجّع المستخدم للـ Home
//         toast("You are already signed in.", { type: "info" });
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1500);
//       })
//       .catch(() => {
//         // لو التوكن غير صالح → امسح الكوكيز وخلي المستخدم يسجّل دخول
//         Cookies.remove("access_token");
//       });
//   }
// }, []);

//   const [formData, setFormData] = useState({ email: "", password: "" });


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await apiFetch("/auth/login", {
//         method: "POST",
//         body: JSON.stringify(formData),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         const { accessToken, first_name, last_name, email } = result;

//         Cookies.set("access_token", accessToken, { expires: 30, secure: true, sameSite: "strict" });
//         Cookies.set("first_name", first_name, { expires: 30 });
//         Cookies.set("last_name", last_name, { expires: 30 });
//         Cookies.set("email", email, { expires: 30 });

//         toast.success("Signed in successfully 🎉");
//         window.location.href = "/";
//       } else {
//         toast.error(result.message || "Invalid credentials");
//       }
//     } catch (error) {
//       toast.error("Server error. Please try again later.");
//       console.error("Login error:", error);
//     }
//   };
 
//   return (
//     <>
//       <ToastContainer />
//       <form onSubmit={handleSubmit}>
//         <div className="mb-5">
//           <label htmlFor="email" className="block mb-2.5">Email</label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//             className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
//             required
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="password" className="block mb-2.5">Password</label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Enter your password"
//             autoComplete="on"
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
//           Sign in to account
//         </button>

//         <a
//   href="/forgot-password"
//   className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
// >
//   Forget your password?
// </a>

//         <span className="relative z-1 block font-medium text-center mt-4.5">
//           <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
//           <span className="inline-block px-3 bg-white">Or</span>
//         </span>

//         <div className="flex flex-col gap-4.5 mt-4.5">
//           {/* Google & GitHub buttons (optional) */}
//         </div>

//         <p className="text-center mt-6">
//           Don&apos;t have an account?
//           <a href="/signup" className="text-dark ease-out duration-200 hover:text-blue pl-2">
//             Sign Up Now!
//           </a>
//         </p>
//       </form>
//     </>
//   );
// }














"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { apiFetch } from "@/utils/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/features/auth-slice";
// import { useRouter } from "next/navigation";  
export default function SigninForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  // const route = useRouter();
  // تحقق إذا المستخدم مسجّل دخول بالفعل
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      apiFetch("/auth/refresh", { method: "GET" })
        .then((res) => {
          if (!res.ok) throw new Error("Invalid token");
          return res.json();
        })
        .then((data) => {
          dispatch(setUser(data)); // خزّن بيانات المستخدم في الـ Redux
          toast("You are already signed in.", { type: "info" });
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        })
        .catch(() => {
          Cookies.remove("access_token");
        });
    }
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;   // يمنع التنفيذ إذا الزر مازال مشغول
setLoading(true);


    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        // السيرفر خزّن الكوكيز (jwt + access_token) تلقائياً
        dispatch(setUser(result)); // خزّن بيانات المستخدم في الـ Redux

        toast.success("Signed in successfully 🎉");
        window.location.href = "/";
        // route.push("/");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            autoComplete="on"
            value={formData.password}
            onChange={handleChange}
            className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
        >
          {loading ? "Signing in..." : "Sign in to account"}
        </button>

        <a
          href="/forgot-password"
          className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
        >
          Forget your password?
        </a>

        <span className="relative z-1 block font-medium text-center mt-4.5">
          <span className="block absolute -z-1 left-0 top-1/2 h-px w-full bg-gray-3"></span>
          <span className="inline-block px-3 bg-white">Or</span>
        </span>

        <div className="flex flex-col gap-4.5 mt-4.5">
          {/* Google & GitHub buttons (optional) */}
        </div>

        <p className="text-center mt-6">
          Don&apos;t have an account?
          <a
            href="/signup"
            className="text-dark ease-out duration-200 hover:text-blue pl-2"
          >
            Sign Up Now!
          </a>
        </p>
      </form>
    </>
  );
}