// "use client";
// import { useState, useEffect } from "react";
// import "../css/euclid-circular-a-font.css";
// import "../css/style.css";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";

// import { ModalProvider } from "../context/QuickViewModalContext";
// import { CartModalProvider } from "../context/CartSidebarModalContext";
// import { ReduxProvider } from "@/redux/provider";
// import QuickViewModal from "@/components/Common/QuickViewModal";
// import CartSidebarModal from "@/components/Common/CartSidebarModal";
// import { PreviewSliderProvider } from "../context/PreviewSliderContext";
// import PreviewSliderModal from "@/components/Common/PreviewSlider";

// import ScrollToTop from "@/components/Common/ScrollToTop";
// import PreLoader from "@/components/Common/PreLoader";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return (
//     <html lang="en" suppressHydrationWarning={true}>
//       <body>
//         {loading ? (
//           <PreLoader />
//         ) : (
//           <>
//             <ReduxProvider>
//               <CartModalProvider>
//                 <ModalProvider>
//                   <PreviewSliderProvider>
//                     <Header />
//                     {children}

//                     <QuickViewModal />
//                     <CartSidebarModal />
//                     <PreviewSliderModal />
//                   </PreviewSliderProvider>
//                 </ModalProvider>
//               </CartModalProvider>
//             </ReduxProvider>
//             <ScrollToTop />
//             <Footer />
//           </>
//         )}
//       </body>
//     </html>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import { Toaster } from "react-hot-toast";
// Redux
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setProducts, setOriginalProducts } from "@/redux/features/products-slice";
import {apiFetch }from "@/utils/api";
// import AuthInitializer from "@/components/Common/AuthInitializer";
import { setUser , clearUser} from "@/redux/features/auth-slice";


// هذا المكوّن مسؤول عن جلب المنتجات بعد أن يكون داخل Provider
function ProductsFetcher({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiFetch("/products");
        const data = await res.json();

        const normalized = (data.products || data).map((item: any) => ({
          ...item,
          id: item._id,
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        

        // أول مرة نحفظ النسخة الأصلية + المعروضة
        dispatch(setOriginalProducts(normalized));
        dispatch(setProducts(normalized));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);




  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  function AuthFetcher() {
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const res = await apiFetch("/auth/refresh", { method: "GET" });
  //     const data = await res.json();
  //     dispatch(setUser(data));
  //   };
  //   fetchUser();
  // }, [dispatch]);
    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiFetch("/auth/refresh", { method: "GET" });
        const data = await res.json();

        if (res.ok) {
          dispatch(setUser(data));   // مستخدم صحيح
        } else {
          dispatch(clearUser());     // خطأ -> نفرغ الـ user
        }
      } catch (error) {
        dispatch(clearUser());       // أي خطأ -> نفرغ الـ user
      }
    };

    fetchUser();
  }, [dispatch]);


  return null; // it just runs the effect
}
  

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <ReduxProvider>
            <ProductsFetcher>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    {/* <AuthInitializer /> */}
                    <AuthFetcher />
                    <Header />
                    {children}
                    <Toaster position="top-right" reverseOrder={false} />

                    
                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                    <ScrollToTop />
                    <Footer />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </ProductsFetcher>
          </ReduxProvider>
        )}
      </body>
    </html>
  );
}