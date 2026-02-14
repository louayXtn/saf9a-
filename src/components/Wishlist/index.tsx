// "use client";
// import React from "react";
// import Breadcrumb from "../Common/Breadcrumb";
// import { useAppSelector } from "@/redux/store";
// import SingleItem from "./SingleItem";

// export const Wishlist = () => {
//   const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

//   return (
//     <>
//       <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
//       <section className="overflow-hidden py-20 bg-gray-2">
//         <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
//           <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
//             <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
//             <button className="text-blue">Clear Wishlist Cart</button>
//           </div>

//           <div className="bg-white rounded-[10px] shadow-1">
//             <div className="w-full overflow-x-auto">
//               <div className="min-w-[1170px]">
//                 {/* <!-- table header --> */}
//                 <div className="flex items-center py-5.5 px-10">
//                   <div className="min-w-[83px]"></div>
//                   <div className="min-w-[387px]">
//                     <p className="text-dark">Product</p>
//                   </div>

//                   <div className="min-w-[205px]">
//                     <p className="text-dark">Unit Price</p>
//                   </div>

//                   <div className="min-w-[265px]">
//                     <p className="text-dark">Stock Status</p>
//                   </div>

//                   <div className="min-w-[150px]">
//                     <p className="text-dark text-right">Action</p>
//                   </div>
//                 </div>

//                 {/* <!-- wish item --> */}
//                 {wishlistItems.map((item, key) => (
//                   <SingleItem item={item} key={key} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };
"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import { removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

export const Wishlist = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromWishlist = (id: number) => {
    dispatch(removeItemFromWishlist(id));
  };
  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      <section className="overflow-hidden py-10 md:py-20 bg-gray-100">
        <div className="max-w-[1170px] w-full mx-auto px-3 sm:px-6 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-7.5">
            <h2 className="font-medium text-dark text-xl md:text-2xl">
              Your Wishlist
            </h2>
            {/* <button className="text-blue hover:underline text-sm md:text-base">
              Clear Wishlist
            </button> */}
          </div>

          <div className="bg-white rounded-lg shadow-md">
            {/* على الكمبيوتر: جدول */}
            <div className="hidden md:block w-full overflow-x-auto">
              <div className="w-full">
                {/* table header */}
                <div className="flex items-center py-5 px-10 bg-gray-50 border-b">
                  <div className="flex-1]"></div>
                  <div className="flex-1">
                    <p className="text-dark font-medium">Product</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-dark font-medium">Unit Price</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-dark font-medium">Stock Status</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-dark font-medium text-right">Action</p>
                  </div>
                </div>

                {/* wish items */}
                {wishlistItems.map((item, key) => (
                  <SingleItem item={item} key={key} />
                ))}
              </div>
            </div>

            {/* على الهاتف: عرض كارد */}
            <div className="block md:hidden p-4 space-y-4">
              {wishlistItems.map((item, key) => (
                <div
                  key={key}
                  className="border rounded-lg p-3 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imgs?.thumbnails[0]}
                      alt={item.title}
                      className="w-20 h-20 object-contain rounded-md bg-gray-100"
                    />
                    <h3 className="text-dark font-medium text-sm">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Price:{" "}
                    <span className="font-semibold text-green-600">
                      ${item.discountedPrice? item.discountedPrice : item.price}
                    </span>
                  </p>
                  <p className="text-xs text-green-600">In Stock</p>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}

                      className="text-red-600 border px-2 py-1 rounded text-xs hover:bg-red-50"
                    >
                      Remove
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};