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

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed with checkout.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await apiFetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,
            sellerId: item.sellerId,
            title: item.title,
            price: item.price,
            discountedPrice: item.discountedPrice,
            quantity: item.quantity,
            previewImg: item.imgs?.previews[0],
          })),
          customerInfo,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order submitted successfully!");

        // تفريغ الحقول
        setCustomerInfo({ name: "", address: "", phone: "" });

        // بعد ثانيتين يرجع للصفحة الرئيسية
        setTimeout(() => {
          location.href = "/";
        }, 2000);
      } else {
        toast.error(data.error || "Failed to submit order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Unexpected error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:max-w-[455px] w-full">
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {cartItems.map((item, key) => (
            <div key={key} className="flex items-center justify-between py-5 border-b border-gray-3">
              <p className="text-dark">{item.title}</p>
              <p className="text-dark text-right">
                ${item.discountedPrice && item.discountedPrice < item.price
                  ? item.discountedPrice * item.quantity
                  : item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-between pt-5">
            <p className="font-medium text-lg text-dark">Total</p>
            <p className="font-medium text-lg text-dark text-right">${totalPrice}</p>
          </div>

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

          <button
            type="button"
            onClick={handleCheckout}
            disabled={isSubmitting}
            className={`w-full flex justify-center font-medium text-white py-3 px-6 rounded-md mt-7.5 ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue hover:bg-blue-dark"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Process to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;