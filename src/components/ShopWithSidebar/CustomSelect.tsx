

// import React, { useState, useEffect, useRef } from "react";

// const CustomSelect = ({ options, products, setProducts , originalProducts }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(options[0]);
//   const selectRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (selectRef.current && !selectRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("click", handleClickOutside);
//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//   setSelectedOption(option);
//   setIsOpen(false);

//   if (option.value === "0") {
//     // أحدث المنتجات → نعكس الترتيب
//     setProducts([...originalProducts].reverse());
//   } else if (option.value === "2") {
//     // المنتجات القديمة → الترتيب الطبيعي
//     setProducts([...originalProducts]);
//   }
// };

//   return (
//     <div
//       className="custom-select custom-select-2 flex-shrink-0 relative"
//       ref={selectRef}
//     >
//       <div
//         className={`select-selected whitespace-nowrap ${
//           isOpen ? "select-arrow-active" : ""
//         }`}
//         onClick={toggleDropdown}
//       >
//         {selectedOption.label}
//       </div>
//       <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
//         {options.map((option, index) => (
//           <div
//             key={index}
//             onClick={() => handleOptionClick(option)}
//             className={`select-item ${
//               selectedOption.value === option.value ? "same-as-selected" : ""
//             }`}
//           >
//             {option.label}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CustomSelect;


"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux/features/products-slice";

const CustomSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const selectRef = useRef(null);

  // جلب المنتجات من الـ Redux
  const products = useAppSelector((state) => state.productsReducer.products);
  const originalProducts = useAppSelector((state) => state.productsReducer.originalProducts);
  const dispatch = useDispatch<AppDispatch>();

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (option.value === "0") {
      // أحدث المنتجات → نعكس الترتيب
      dispatch(setProducts([...originalProducts].reverse()));
    } else if (option.value === "2") {
      // المنتجات القديمة → الترتيب الطبيعي
      dispatch(setProducts([...originalProducts]));
    }
  };

  return (
    <div
      className="custom-select custom-select-2 flex-shrink-0 relative"
      ref={selectRef}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption.label}
      </div>
      <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`select-item ${
              selectedOption.value === option.value ? "same-as-selected" : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;