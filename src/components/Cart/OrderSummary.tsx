// import { selectTotalPrice } from "@/redux/features/cart-slice";
// import { useAppSelector } from "@/redux/store";
// import React from "react";
// import { useSelector } from "react-redux";

// const OrderSummary = () => {
//   const cartItems = useAppSelector((state) => state.cartReducer.items);
//   const totalPrice = useSelector(selectTotalPrice);

//   return (
//     <div className="lg:max-w-[455px] w-full">
//       {/* <!-- order list box --> */}
//       <div className="bg-white shadow-1 rounded-[10px]">
//         <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
//           <h3 className="font-medium text-xl text-dark">Order Summary</h3>
//         </div>

//         <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
//           {/* <!-- title --> */}
//           <div className="flex items-center justify-between py-5 border-b border-gray-3">
//             <div>
//               <h4 className="font-medium text-dark">Product</h4>
//             </div>
//             <div>
//               <h4 className="font-medium text-dark text-right">Subtotal</h4>
//             </div>
//           </div>

//           {/* <!-- product item --> */}
//           {cartItems.map((item, key) => (
//             <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
//               <div>
//                 <p className="text-dark">{item.title}</p>
//               </div>
//               <div>
//                 <p className="text-dark text-right">
//                   ${item.discountedPrice * item.quantity}
//                 </p>
//               </div>
//             </div>
//           ))}

//           {/* <!-- total --> */}
//           <div className="flex items-center justify-between pt-5">
//             <div>
//               <p className="font-medium text-lg text-dark">Total</p>
//             </div>
//             <div>
//               <p className="font-medium text-lg text-dark text-right">
//                 ${totalPrice}
//               </p>
//             </div>
//           </div>

//           {/* <!-- checkout button --> */}
//           <button
//             type="submit"
//             className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
//           >
//             Process to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;



import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { apiFetch } from "@/utils/api";
import { RootState } from "@/redux/store";
const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const user = useSelector((state: RootState) => state.authReducer.user);
  const totalPrice = useSelector(selectTotalPrice);

  // state لحفظ بيانات العميل
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // تحديث البيانات عند الكتابة
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  // إرسال الطلب
  const handleCheckout = async () => {
    console.log("User state:", user);
  if (!user) {
    toast.error("Please log in to proceed with checkout.");
    return;
  }
  try {
    console.log("User state:", user);
    const res = await apiFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,          // من MongoDB
            sellerId: item.sellerId,            // البائع
            title: item.title,
            price: item.price,
            discountedPrice: item.discountedPrice,
            quantity: item.quantity,
            previewImg: item.imgs?.previews[0], // 👈 رابط الصورة (أول preview)
          })),
          customerInfo,
        }),
      });


    const data = await res.json();
    console.log("Order created:", data);
    if (res.ok) {
      toast.success("Order submitted successfully!");
    } else {
      toast.error(data.error || "Failed to submit order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    toast.error("Unexpected error");
  }
};


  return (
    <div className="lg:max-w-[455px] w-full">
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* قائمة المنتجات */}
          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
              <p className="text-dark">{item.title}</p>
              <p className="text-dark text-right">
                ${item.discountedPrice && item.discountedPrice < item.price ? item.discountedPrice*item.quantity : item.price * item.quantity}
              </p>
            </div>
          ))}

          {/* المجموع */}
          <div className="flex items-center justify-between pt-5">
            <p className="font-medium text-lg text-dark">Total</p>
            <p className="font-medium text-lg text-dark text-right">${totalPrice}</p>
          </div>

          {/* حقول إدخال بيانات العميل */}
          <div className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={customerInfo.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={customerInfo.address}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone"
              value={customerInfo.phone}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* زر الإرسال */}
          <button
            type="button"
            onClick={handleCheckout}
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md hover:bg-blue-dark mt-7.5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
