// "use client";
// import { useState } from "react";
// import Image from "next/image";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSave: (imageName: string) => void;
// }

// const profileImages = [
//   "image0.png","image1.png","image2.png","image3.png","image4.png",
//   "image5.png","image6.png","image7.png","image8.png","image9.png",
//   "image10.png","image11.png","image12.png","image13.png",
// ];

// export default function ProfileImageModal({ open, onClose, onSave }: Props) {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   if (!open) return null; // لا يظهر إلا إذا كان مفتوح

//   const handleConfirm = () => {
//   if (!selectedImage) return;
//   const confirm = window.confirm(
//     `Are you sure you want to change your profile image ?`
//   );
//   if (!confirm) return;
//   onSave(selectedImage); // هنا يتم إرسال الصورة المختارة للباك إند
// };

//   return (
//     <div className=" z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
//         <h2 className="text-xl font-bold mb-4">Choose a Profile Image</h2>

//         <div className="grid grid-cols-3 gap-3">
//           {profileImages.map((img) => (
//             <Image
//               key={img}
//               src={`/profile-images/${img}`}
//               alt={img}
//               width={80}
//               height={80}
//              className={`rounded-full cursor-pointer border-4 ${
//     selectedImage === img
//       ? "border-blue-500 ring-2 ring-blue-400"
//       : "border-gray-300"
//   }`}

//               onClick={() => setSelectedImage(img)}
//             />
//           ))}
//         </div>

//         <div className="flex justify-end gap-3 mt-5">
//           <button
//             onClick={onClose}
//             className="px-3 py-1 bg-gray-300 rounded"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             disabled={!selectedImage}
//             className="px-3 py-1 bg-blue-600 text-blue rounded disabled:opacity-50"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (imageName: string) => void;
}

const profileImages = [
  "image0.png","image1.png","image2.png","image3.png","image4.png",
  "image5.png","image6.png","image7.png","image8.png","image9.png",
  "image10.png","image11.png","image12.png","image13.png",
];

export default function ProfileImageModal({ open, onClose, onSave }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false); // 👈 مودال التأكيد

  if (!open) return null;

  const handleConfirm = () => {
    if (!selectedImage) return;
    setShowConfirm(true); // 👈 نفتح مودال التأكيد بدل window.confirm
  };

  const handleConfirmSave = () => {
    if (!selectedImage) return;
    onSave(selectedImage);
    setShowConfirm(false);
    onClose();
  };

  return (
    <div className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Choose a Profile Image</h2>

        <div className="grid grid-cols-3 gap-3">
          {profileImages.map((img) => (
            <Image
              key={img}
              src={`/profile-images/${img}`}
              alt={img}
              width={80}
              height={80}
              className={`rounded-full cursor-pointer border-4 ${
                selectedImage === img
                  ? "border-blue-500 ring-2 ring-blue-400"
                  : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedImage}
            className="px-3 py-1 bg-blue text-white rounded disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>

      {/* مودال التأكيد */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <h3 className="text-lg font-semibold mb-4">Confirm Change</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to change your profile image?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="px-3 py-1 bg-blue text-white rounded"
              >
                Yes, Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}