// "use client";

// import React, { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { apiFetch, refreshAccessToken } from "../../utils/api";
// import { useRouter } from "next/navigation";
// const AddressModal = ({ isOpen, closeModal }) => {
//   const [formData, setFormData] = useState({
//     email: Cookies.get("email") || "",
//     address: Cookies.get("address") || "",
//     contact: Cookies.get("contact") || "",
//   });
//   const router = useRouter();
//   const firstName = Cookies.get("first_name") || "";
//   const lastName = Cookies.get("last_name") || "";

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await apiFetch("/users/update-profile", {
//       method: "PUT",
//       body: JSON.stringify({
//         email: formData.email,
//         contact: formData.contact,
//         address: formData.address,
//       }),
//     });
//     refreshAccessToken(); // حدّث التوكن بعد تحديث الملف الشخصي
    
//     if (res.ok) {
//       const data = await res.json();
//       console.log("تم تحديث البيانات:", data);
//       closeModal();
//       router.push("/my-account");


//     } else {
//       console.error("فشل التحديث");
//     }
//   } catch (err) {
//     console.error("خطأ:", err);
//   }
// };


//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (!event.target.closest(".modal-content")) {
//         closeModal();
//       }
//     }
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, closeModal]);

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-screen bg-dark/70 ${
//         isOpen ? "block z-99999" : "hidden"
//       }`}
//     >
//       <div className="flex items-center justify-center">
//         <div className="modal-content w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative">
//           <button onClick={closeModal} className="absolute top-3 right-3">X</button>

//           {/* الاسم يظهر كعنوان صغير فقط */}
//           <h3 className="text-lg font-semibold mb-5">
//             {firstName} {lastName}
//           </h3>

//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col lg:flex-row gap-5 mb-5">
//               <div className="w-full">
//                 <label className="block mb-2.5">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
//                 />
//               </div>
//               <div className="w-full">
//                 <label className="block mb-2.5">Contact</label>
//                 <input
//                   type="text"
//                   name="contact"
//                   value={formData.contact}
//                   onChange={handleChange}
//                   className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
//                 />
//               </div>
//             </div>

//             <div className="w-full mb-5">
//               <label className="block mb-2.5">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
//               />
//             </div>

//             <button
//               type="submit"
//               className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md hover:bg-blue-dark"
//             >
//               Save Changes
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressModal;
"use client";
import React, { useEffect, useState } from "react";
import { apiFetch, refreshAccessToken } from "../../utils/api";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/features/auth-slice";

const AddressModal = ({ isOpen, closeModal }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // اقرأ بيانات المستخدم من الـ Redux
  const user = useSelector((state: RootState) => state.authReducer.user);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    address: user?.address || "",
    contact: user?.contact || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/users/update-profile", {
        method: "PUT",
        body: JSON.stringify({
          email: formData.email,
          contact: formData.contact,
          address: formData.address,
        }),
      });

      refreshAccessToken(); // جدّد التوكن بعد التحديث

      if (res.ok) {
        const data = await res.json();
        console.log("تم تحديث البيانات:", data);

        // خزّن البيانات الجديدة في الـ Redux
        dispatch(setUser(data));

        closeModal();
        router.push("/my-account");
      } else {
        console.error("فشل التحديث");
      }
    } catch (err) {
      console.error("خطأ:", err);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!(event.target as HTMLElement).closest(".modal-content")) {
        closeModal();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-dark/70 ${
        isOpen ? "block z-99999" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center">
        <div className="modal-content w-full max-w-[1100px] rounded-xl shadow-3 bg-white p-7.5 relative">
          <button onClick={closeModal} className="absolute top-3 right-3">X</button>

          {/* الاسم يظهر كعنوان صغير فقط */}
          <h3 className="text-lg font-semibold mb-5">
            {user?.first_name} {user?.last_name}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-5 mb-5">
              <div className="w-full">
                <label className="block mb-2.5">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder={user?.email || ""}
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                />
              </div>
              <div className="w-full">
                <label className="block mb-2.5">Contact</label>
                <input
                  type="text"
                  placeholder={user?.contact || ""}
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
                />
              </div>
            </div>

            <div className="w-full mb-5">
              <label className="block mb-2.5">Address</label>
              <input
                type="text"
                name="address"
                placeholder={user?.address || ""} 
                value={formData.address}
                onChange={handleChange}
                className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5"
              />
            </div>

            <button
              type="submit"
              className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md hover:bg-blue-dark"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;