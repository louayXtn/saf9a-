import { Category } from './category';
// export type Product = {
//   title: string;
//   reviews: number;
//   price: number;
//   discountedPrice: number;
//   id: number;
//   imgs?: {
//     thumbnails: string[];
//     previews: string[];
//   };
// };


// export type Product = {
//   _id?: string;
//   id?: number;
//   title: string;
//   reviews: number;
//   price: number;
//   discountedPrice: number;
//   imgs: {
//     thumbnails: string[];
//     previews: string[];
//   };
//   status?: string;
//   quantity?: number;
// };

export type Product = {
  _id?: string;              // من MongoDB
  id?: number;               // للمنتجات المحلية أو الـ mock data
  title: string;             // عنوان المنتج
  reviews: number;           // عدد المراجعات
  price?: number;             // السعر الأصلي
  discountedPrice: number;   // السعر بعد الخصم
  description?: string;      // وصف المنتج
  contactInfo?: string;    // معلومات الاتصال بالبائع
  imgs: {                    // الصور (ثابتة ومتزامنة بين thumbnails و previews)
    thumbnails: string[];
    previews: string[];
  };
  rejectionReason?: string | null; // سبب الرفض إذا كان المنتج مرفوضًا

  category?:string
  imageFileIds?: string[];   // IDs من ImageKit لحذف الصور عند الحاجة
  status?: string;           // حالة المنتج (مثلاً: "SALE", "NEW")
  quantity?: number;         // الكمية عند إضافته للسلة
  createdAt?: string;        // تاريخ الإنشاء (من MongoDB)
  updatedAt?: string;        // تاريخ التحديث (من MongoDB)
  activePreview?: string;
  createdBy: {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  profileImage?: string; 
};
};