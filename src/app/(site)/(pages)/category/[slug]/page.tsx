"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "../../../../../components/Common/Breadcrumb";

import SingleGridItem from "../../../../../components/Shop/SingleGridItem";
import SingleListItem from "../../../../../components/Shop/SingleListItem";
import CustomSelect from "../../../../../components/ShopWithSidebar/CustomSelect";

import { useAppSelector } from "@/redux/store";
import { Product } from "@/types/product"; // ✅ استعمل النوع الموحد اللي عندك

const CategoryPage: React.FC = () => {
  const [productStyle, setProductStyle] = useState<"grid" | "list">("grid");
  const params = useParams();
  const slug = params?.slug as string;


  // جلب المنتجات من الـ Redux
  const products = useAppSelector(
    (state) => state.productsReducer.products
  ) as Product[];

  // فلترة المنتجات حسب التصنيف
  const filteredProducts = products.filter(
    (item) => item.category?.toLowerCase() === slug?.toLowerCase()
  );

  const options = [
    { label: "Latest Products", value: "2" },
    { label: " Old Products", value: "0" },
  ];

  return (
    <>
      <Breadcrumb
        title={`Explore ${slug} Products`}
        pages={["shop", "/", `category/${slug}`]}
      />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* // <!-- Content Start --> */}
            <div className="w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  {/* <!-- top bar left --> */}
                  <div className="flex flex-wrap items-center gap-4">
                    <CustomSelect options={options} />
                    <p>
                      Showing{" "}
                      <span className="text-dark">
                        {filteredProducts.length}
                      </span>{" "}
                      Products
                    </p>
                  </div>

                  {/* <!-- top bar right --> */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="button for product grid tab"
                      className={`${
                        productStyle === "grid"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="button for product list tab"
                      className={`${
                        productStyle === "list"
                          ? "bg-blue border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } hidden md:flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- Products Grid/List Content --> */}
              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {filteredProducts.map((item, key) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={key} />
                  ) : (
                    <SingleListItem item={item} key={key} />
                  )
                )}
              </div>

              {/* <!-- Pagination --> */}
              <div className="flex justify-center mt-15">
                <div className="bg-white shadow-1 rounded-md p-2">
                  <ul className="flex items-center">
                    <li>
                      <button
                        id="paginationLeft"
                        aria-label="button for pagination left"
                        type="button"
                        disabled
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] disabled:text-gray-4"
                      >
                        ←
                      </button>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] bg-blue text-white hover:text-white hover:bg-blue"
                      >
                        1
                      </a>
                    </li>
                    {/* باقي الصفحات حسب الحاجة */}
                  </ul>
                </div>
              </div>
            </div>
            {/* // <!-- Content End --> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;