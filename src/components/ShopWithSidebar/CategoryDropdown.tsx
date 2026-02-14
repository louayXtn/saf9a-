




// "use client";

// import { useState } from "react";

// const CategoryItem = ({ category, selectedCategories, setSelectedCategories }) => {
//   const isSelected = selectedCategories.includes(category.name);

//   const toggleCategory = () => {
//     if (isSelected) {
//       setSelectedCategories(selectedCategories.filter((c) => c !== category.name));
//     } else {
//       setSelectedCategories([...selectedCategories, category.name]);
//     }
//   };

//   return (
//     <button
//       className={`${isSelected && "text-blue"} group flex items-center justify-between ease-out duration-200 hover:text-blue`}
//       onClick={toggleCategory}
//     >
//       <div className="flex items-center gap-2">
//         <div
//           className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
//             isSelected ? "border-blue bg-blue" : "bg-white border-gray-3"
//           }`}
//         >
//           <svg
//             className={isSelected ? "block" : "hidden"}
//             width="10"
//             height="10"
//             viewBox="0 0 10 10"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
//               stroke="white"
//               strokeWidth="1.94437"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <span>{category.name}</span>
//       </div>

//       <span
//         className={`${
//           isSelected ? "text-white bg-blue" : "bg-gray-2"
//         } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue`}
//       >
//         {category.products}
//       </span>
//     </button>
//   );
// };

// const CategoryDropdown = ({ categories, products, setProducts, originalProducts }) => {
//   const [toggleDropdown, setToggleDropdown] = useState(true);

//   // states للفلترة بالسعر
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   // state للفلترة بالـ category
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const applyFilter = () => {
//     // نبدأ دائمًا من النسخة الأصلية
//     let result = [...originalProducts];

//     // filter by price
//     if (minPrice) result = result.filter((p) => p.discountedPrice >= Number(minPrice));
//     if (maxPrice) result = result.filter((p) => p.discountedPrice <= Number(maxPrice));

//     // filter by category
//     if (selectedCategories.length > 0) {
//       result = result.filter((p) => selectedCategories.includes(p.category));
//     }

//     // تحديث الـ parent
//     setProducts(result);
//   };

//   const resetFilter = () => {
//     setProducts(originalProducts); // رجوع لكل المنتجات
//     setMinPrice("");
//     setMaxPrice("");
//     setSelectedCategories([]);
//   };

//   return (
//     <div className="bg-white shadow-1 rounded-lg">
//       <div
//         onClick={(e) => {
//           e.preventDefault();
//           setToggleDropdown(!toggleDropdown);
//         }}
//         className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
//           toggleDropdown && "shadow-filter"
//         }`}
//       >
//         <p className="text-dark">Category & Price Filter</p>
//         <button
//           aria-label="button for category dropdown"
//           className={`text-dark ease-out duration-200 ${toggleDropdown && "rotate-180"}`}
//         >
//           ▼
//         </button>
//       </div>

//       {/* dropdown menu */}
//       <div className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${toggleDropdown ? "flex" : "hidden"}`}>
//         {categories.map((category, key) => (
//           <CategoryItem
//             key={key}
//             category={category}
//             selectedCategories={selectedCategories}
//             setSelectedCategories={setSelectedCategories}
//           />
//         ))}

//         {/* filter inputs للسعر */}
//         <div className="flex flex-col gap-2 mt-4">
//           <input
//             type="number"
//             placeholder="Min Price"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             className="border rounded px-2 py-1"
//           />
//           <input
//             type="number"
//             placeholder="Max Price"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             className="border rounded px-2 py-1"
//           />

//           <button
//             onClick={applyFilter}
//             className="bg-blue text-white rounded px-3 py-1 mt-2 hover:bg-dark-blue ease-out duration-200"
//           >
//             Apply Filter
//           </button>

//           <button
//             onClick={resetFilter}
//             className="bg-gray-400 text-white rounded px-3 py-1 mt-2 hover:bg-gray-600 ease-out duration-200"
//           >
//             Reset Filter
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryDropdown;

"use client";

import { useState } from "react";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/features/products-slice";

const CategoryItem = ({ category, selectedCategories, setSelectedCategories }) => {
  const isSelected = selectedCategories.includes(category.name);

  const toggleCategory = () => {
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category.name));
    } else {
      setSelectedCategories([...selectedCategories, category.name]);
    }
  };

  return (
    <button
      className={`${isSelected && "text-blue"} group flex items-center justify-between ease-out duration-200 hover:text-blue`}
      onClick={toggleCategory}
    >
      <div className="flex items-center gap-2">
        <div
          className={`cursor-pointer flex items-center justify-center rounded w-4 h-4 border ${
            isSelected ? "border-blue bg-blue" : "bg-white border-gray-3"
          }`}
        >
          <svg
            className={isSelected ? "block" : "hidden"}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33317 2.5L3.74984 7.08333L1.6665 5"
              stroke="white"
              strokeWidth="1.94437"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span>{category.name}</span>
      </div>

      <span
        className={`${
          isSelected ? "text-white bg-blue" : "bg-gray-2"
        } inline-flex rounded-[30px] text-custom-xs px-2 ease-out duration-200 group-hover:text-white group-hover:bg-blue`}
      >
        {category.products}
      </span>
    </button>
  );
};

const CategoryDropdown = ({ categories ,setFilteredProducts,productSidebar,productStyle,setProductStyle,setProductSidebar}) => {
  const [toggleDropdown, setToggleDropdown] = useState(true);
  
  // states للفلترة بالسعر
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // state للفلترة بالـ category
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // جلب المنتجات من الـ Redux
  const products = useAppSelector((state) => state.productsReducer.products);
  const originalProducts = useAppSelector((state) => state.productsReducer.originalProducts);
  const dispatch = useDispatch<AppDispatch>();

  const applyFilter = () => {
  let result = [...originalProducts];

  if (minPrice) result = result.filter((p) => p.discountedPrice >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.discountedPrice <= Number(maxPrice));
  if (selectedCategories.length > 0) {
    result = result.filter((p) => selectedCategories.includes(p.category));
  }

  // dispatch(setProducts(result)); // يغيّر فقط المنتجات المعروضة
  setFilteredProducts(result);

};

const resetFilter = () => {
  dispatch(setProducts(originalProducts)); // يرجع للنسخة الأصلية
  setMinPrice("");
  setMaxPrice("");
  setSelectedCategories([]);
};

  return (
    <div className="bg-white shadow-1 rounded-lg">
      <div
        onClick={(e) => {
          e.preventDefault();
          setToggleDropdown(!toggleDropdown);
        }}
        className={`cursor-pointer flex items-center justify-between py-3 pl-6 pr-5.5 ${
          toggleDropdown && "shadow-filter"
        }`}
      >
        <p className="text-dark">Category & Price Filter</p>
        <button
          aria-label="button for category dropdown"
          className={`text-dark ease-out duration-200 ${toggleDropdown && "rotate-180"}`}
        >
          ▼
        </button>
      </div>

      {/* dropdown menu */}
      <div className={`flex-col gap-3 py-6 pl-6 pr-5.5 ${toggleDropdown ? "flex" : "hidden"}`}>
        {categories.map((category, key) => (
          <CategoryItem
            key={key}
            category={category}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            
          />
        ))}

        {/* filter inputs للسعر */}
        <div className="flex flex-col gap-2 mt-4">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded px-2 py-1"
          />

          <button
            onClick={() => {
              applyFilter();
              setProductSidebar(false);
            }}
            className="bg-blue text-white rounded px-3 py-1 mt-2 hover:bg-dark-blue ease-out duration-200"
          >
            Apply Filter
          </button>

          <button
            onClick={resetFilter}
            className="bg-gray-400 text-white rounded px-3 py-1 mt-2 hover:bg-gray-600 ease-out duration-200"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;