"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { apiFetch } from "@/utils/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { title: "Electronics", id: 1 },
  { title: "Fashion", id: 2 },
  { title: "Home & Furniture", id: 3 },
  { title: "Vehicles", id: 4 },
  { title: "Equipments", id: 5 },
  { title: "Animals", id: 6 },
  { title: "Home & Kitchen", id: 7 },
];

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountedPrice: "",
    contactInfo: "",
    category: "",
    description: "",
    thumbnails: [] as File[],
    previews: [] as File[],
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewThumbs, setPreviewThumbs] = useState<string[]>([]);
  const [previewPreviews, setPreviewPreviews] = useState<string[]>([]);
  
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("❗ Please sign in to add a product");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    }
  }, []);
  // تغيير النصوص
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // رفع الصور مع حد أقصى = 2
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "thumbnails" | "previews"
  ) => {
    if (e.target.files) {
      let newFiles = Array.from(e.target.files);

      setFormData(prev => {
        let combined = [...prev[field], ...newFiles];

        if (combined.length > 2) {
          toast.error("❗ يمكنك رفع صورتين فقط");
          combined = combined.slice(0, 2);
        }

        const previews = combined.map(file => URL.createObjectURL(file));
        if (field === "thumbnails") {
          setPreviewThumbs(previews);
        } else {
          setPreviewPreviews(previews);
        }

        return { ...prev, [field]: combined };
      });

      e.target.value = "";
    }
  };

  // إرسال البيانات للسيرفر
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if(formData.previews.length === 0 || formData.thumbnails.length === 0){
      toast.error("❗ الرجاء رفع الصور المطلوبة");
      setLoading(false);
      return;
    }
    const form = new FormData();

    form.append("title", formData.title);
    form.append("price", formData.price);
    form.append("discountedPrice", formData.discountedPrice);
    form.append("contactInfo", formData.contactInfo);
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("first_name", Cookies.get("first_name") || "");
    form.append("last_name", Cookies.get("last_name") || "");

    formData.thumbnails.forEach(file => form.append("thumbnails", file));
    formData.previews.forEach(file => form.append("previews", file));

    try {
      const res = await apiFetch("/products/add", {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      toast.success("🎉 المنتج تمت إضافته بنجاح!");

      setFormData({
        title: "",
        price: "",
        discountedPrice: "",
        contactInfo: "",
        category: "",
        description: "",
        thumbnails: [],
        previews: [],
      });
      setPreviewThumbs([]);
      setPreviewPreviews([]);
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("حدث خطأ أثناء إضافة المنتج");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-50 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-6 px-3 sm:px-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-6 sm:p-10 border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-6 sm:mb-8 text-center">
          🛒 Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Title */}
          <InputField label="Title" name="title" value={formData.title} onChange={handleChange} />

          {/* Price & Discounted Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InputField label="Price" name="price" value={formData.price} onChange={handleChange} type="number" />
            {/* <InputField label="Discounted Price" name="discountedPrice" value={formData.discountedPrice} onChange={handleChange} type="number" /> */}
          
          {/* show that in that do the verify account */}
          {/* <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Discounted Price</label>
    <input
      type="number"
      name="discountedPrice"
      value={formData.discountedPrice}
      onChange={handleChange}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
      // ما نحطش required هنا
    />
  </div> */}

          </div>

          {/* Contact */}
          <InputField label="Contact Info" name="contactInfo" value={formData.contactInfo} onChange={handleChange} />

          {/* Category */}
          <CategorySelect value={formData.category} onChange={handleChange} />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
              rows={4}
              required
            />
          </div>

          {/* Thumbnails */}
          <FileUpload label="Thumbnails (max 2)" onChange={(e) => handleFileChange(e, "thumbnails")} />
          <ImagePreview images={previewThumbs} />

          {/* Previews */}
          <FileUpload label="Previews (max 2)" onChange={(e) => handleFileChange(e, "previews")} />
          <ImagePreview images={previewPreviews} />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-light text-black font-semibold rounded-lg py-2.5 sm:py-3 hover:bg-blue-700 transition ease-out duration-200 shadow-md text-sm sm:text-base"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ مكونات فرعية
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
      required
    />
  </div>
);

const CategorySelect = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
    <select
      name="category"
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
      required
    >
      <option value="">-- Select Category --</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.title}>
          {cat.title}
        </option>
      ))}
    </select>
  </div>
);

const FileUpload = ({ label, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={onChange}
      className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-3 sm:file:px-4
                 file:rounded-full file:border-0
                 file:text-sm sm:file:text-base file:font-semibold
                 file:bg-blue file:text-white
                 hover:file:bg-blue-700"
    />
  </div>
);

const ImagePreview = ({ images }) => (
  <div className="flex gap-2 sm:gap-3 flex-wrap mt-3">
    {images.map((src, index) => (
      <img
        key={index}
        src={src}
        alt={`preview-${index}`}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border shadow-sm hover:scale-105 transition-transform"
      />
    ))}
  </div>
);

export default AddProductPage;