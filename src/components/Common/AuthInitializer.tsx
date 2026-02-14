// "use client";
// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import { apiFetch } from "@/utils/api";

// export default function AuthInitializer() {
//   useEffect(() => {
//     const accessToken = Cookies.get("access_token");
//     const firstName = Cookies.get("first_name");
//     const lastName = Cookies.get("last_name");
//     const email = Cookies.get("email");
//     const contact = Cookies.get("contact");
//     const address = Cookies.get("address");
    

//     // إذا ما عندنا بيانات المستخدم لكن السيرفر عنده jwt (HttpOnly)
//     if (!accessToken || !firstName || !lastName || !email || !contact || !address) {
//       apiFetch("/auth/refresh", { // جرّب مباشرة
//         method: "GET",
//         credentials: "include",
//       })
//         .then((res) => {
//           if (!res.ok) throw new Error("Refresh failed");
//           return res.json();
//         })
//         .then((data) => {
//           console.log("✅ Refresh result:", data);
//           if (data.accessToken) {
//             Cookies.set("access_token", data.accessToken);
//             Cookies.set("first_name", data.first_name);
//             Cookies.set("last_name", data.last_name);
//             Cookies.set("email", data.email);
//             Cookies.set("contact", data.contact || "");
//             Cookies.set("address", data.address || "");
//             window.location.reload(); // Reload to update state
//           }
//         })
//         .catch((err) => console.error("Refresh error:", err));
//     }
//   }, []);

//   return null;
// }



















// "use client";
// import { useEffect } from "react";
// import Cookies from "js-cookie";
// import { apiFetch } from "@/utils/api";

// export default function AuthInitializer() {
//   useEffect(() => {
//     const accessToken = Cookies.get("access_token");
//     const firstName = Cookies.get("first_name");
//     const lastName = Cookies.get("last_name");
//     const email = Cookies.get("email");
//     const contact = Cookies.get("contact");
//     const address = Cookies.get("address");

//     // الحالة 1: عندك JWT (access_token) لكن ناقص بيانات
//     if (accessToken && (!firstName || !lastName || !email || !contact || !address)) {
//       apiFetch("/auth/refresh", { method: "GET", credentials: "include" })
//         .then((res) => {
//           if (!res.ok) throw new Error("Refresh failed");
//           return res.json();
//         })
//         .then((data) => {
//           if (data.accessToken) {
//             Cookies.set("access_token", data.accessToken);
//             Cookies.set("first_name", data.first_name);
//             Cookies.set("last_name", data.last_name);
//             Cookies.set("email", data.email);
//             Cookies.set("contact", data.contact || "");
//             Cookies.set("address", data.address || "");
//           }
//         })
//         .catch((err) => console.error("Refresh error:", err));
//     }

//     // الحالة 2: ما عندك JWT → امسح كل الكوكيز
//     if (!accessToken) {
//       Cookies.remove("access_token");
//       Cookies.remove("first_name");
//       Cookies.remove("last_name");
//       Cookies.remove("email");
//       Cookies.remove("contact");
//       Cookies.remove("address");
//     }
//   }, []);

//   return null;
// }