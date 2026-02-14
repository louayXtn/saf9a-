"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number; // عدد الصفحات الظاهرة (مثلاً 5)
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}) => {
  // تحديد الصفحات التي ستظهر
  const pages = Array.from(
    { length: Math.min(totalPages, maxVisible) },
    (_, i) => i + 1
  );

  return (
    <div className="flex justify-center mt-15">
      <div className="bg-white shadow-1 rounded-md p-2">
        <ul className="flex items-center">
          {/* زر السابق */}
          <li>
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-9 rounded-[3px] disabled:text-gray-4 hover:bg-blue hover:text-white"
            >
              ←
            </button>
          </li>

          {/* أرقام الصفحات */}
          {pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`flex py-1.5 px-3.5 rounded-[3px] ${
                  currentPage === page
                    ? "bg-blue text-white"
                    : "hover:bg-blue hover:text-white"
                }`}
              >
                {page}
              </button>
            </li>
          ))}

          {/* زر التالي */}
          <li>
            <button
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-9 rounded-[3px] disabled:text-gray-4 hover:bg-blue hover:text-white"
            >
              →
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;