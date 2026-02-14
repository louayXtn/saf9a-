"use client";
import React, { createContext, useContext, useState } from "react";

interface PreviewSliderType {
  isModalPreviewOpen: boolean;
  openPreviewModal: () => void;
  closePreviewModal: () => void;
}

const PreviewSlider = createContext<PreviewSliderType | undefined>(undefined);

export const usePreviewSlider = () => {
  const context = useContext(PreviewSlider);
  if (!context) {
    throw new Error("usePreviewSlider must be used within a ModalProvider");
  }
  return context;
};

export const PreviewSliderProvider = ({ children }) => {
  const [isModalPreviewOpen, setIsModalOpen] = useState(false);

  const openPreviewModal = () => {
    setIsModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PreviewSlider.Provider
      value={{ isModalPreviewOpen, openPreviewModal, closePreviewModal }}
    >
      {children}
    </PreviewSlider.Provider>
  );
};

//  "use client";
// import React, { createContext, useContext, useState } from "react";
// interface PreviewSliderType {
//   isModalPreviewOpen: boolean;
//   currentImage: string | null; // الصورة الحالية
//   openPreviewModal: (image: string) => void;
//   closePreviewModal: () => void;
// }

// const PreviewSlider = createContext<PreviewSliderType | undefined>(undefined);

// export const PreviewSliderProvider = ({ children }) => {
//   const [isModalPreviewOpen, setIsModalOpen] = useState(false);
//   const [currentImage, setCurrentImage] = useState<string | null>(null);

//   const openPreviewModal = (image: string) => {
//     setCurrentImage(image); // نخزن الصورة اللي ضغط عليها
//     setIsModalOpen(true);
//   };

//   const closePreviewModal = () => {
//     setIsModalOpen(false);
//     setCurrentImage(null);
//   };

//   return (
//     <PreviewSlider.Provider
//       value={{ isModalPreviewOpen, currentImage, openPreviewModal, closePreviewModal }}
//     >
//       {children}
//     </PreviewSlider.Provider>
//   );
// };