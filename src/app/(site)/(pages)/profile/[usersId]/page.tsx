


// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ProductItem from "@/components/Common/ProductItem";
// import Image from "next/image";

// interface User {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   address: string;
//   profileImage?: string; // أضفنا الصورة هنا
//   contactInfo?: string;
// }

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   category: string;
//   contactInfo: string;
//   imgs: {
//     thumbnails: string[];
//     previews: string[];
//     createdBy: {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   profileImage?: string; 
// };
//   };
// }

// interface ProfileData {
//   user?: User;
//   products: Product[];
// }

// export default function UserProfile() {
//   const { usersId } = useParams();
//   const [data, setData] = useState<ProfileData | null>(null);

//   useEffect(() => {
//     if (usersId) {
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${usersId}/profile`)
//         .then((res) => res.json())
//         .then((json) => setData(json));
//     }
//   }, [usersId]);

//   if (!data || !data.user) return <p>Loading...</p>;

//   const { user, products } = data;

//   return (
//     <div className="p-6 mt-50">
//       {/* User header with image */}
//       <div className="flex items-center gap-4 mb-6">
//         <Image
//           src={
//             user.profileImage
//               ? `/profile-images/${user.profileImage}`
//               : "/profile-images/default.png"
//           }
//           alt={`${user.first_name} ${user.last_name}`}
//           width={80}
//           height={80}
//           className="rounded-full border shadow"
//         />
//         <h1 className="text-3xl font-extrabold text-blue-700">
//           {user.first_name} {user.last_name}
//         </h1>
//       </div>

//       {/* User info card */}
//       <div className="mb-6 border p-6 rounded-lg shadow bg-white">
//         <p className="text-lg font-medium">📧 Email: {user.email}</p>
//         <p className="text-lg">🌍 Country: {user.country}</p>
//         {products.length > 0 && (
//           <p className="text-lg">📞 Contact: {products[0].contactInfo}</p>
//         )}
//       </div>

//       {/* Products section */}
//       <h2 className="text-2xl font-semibold mb-3 text-gray-800">Products:</h2>
//       <div className="grid grid-cols-3 gap-4">
//         {products.map((p) => (
//           <ProductItem item={p as any} key={p._id} />
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductItem from "@/components/Common/ProductItem";
import Image from "next/image";

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  profileImage?: string;
  contact?: string;
  country?: string;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  category: string;
  contactInfo: string;
  imgs: {
    thumbnails: string[];
    previews: string[];
  };
  createdBy: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    profileImage?: string;
  };
}

interface ProfileData {
  user?: User;
  products: Product[];
}

export default function UserProfile() {
  const { usersId } = useParams();
  const [data, setData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (usersId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${usersId}/profile`)
        .then((res) => res.json())
        .then((json) => setData(json));
    }
  }, [usersId]);

  if (!data || !data.user) return <p>Loading...</p>;

  const { user, products } = data;

  return (
    <div className="p-6 mt-50 md:mt-35 ">
      {/* User header with image */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={
            user.profileImage
              ? `/profile-images/${user.profileImage}`
              : "/profile-images/default.png"
          }
          alt={`${user.first_name} ${user.last_name}`}
          width={80}
          height={80}
          className="rounded-full border shadow"
        />
        <h1 className="sm:text-3xl text-xl font-extrabold text-blue-700">
          {user.first_name} {user.last_name}
        </h1>
      </div>

      {/* User info card */}
      <div className="mb-6 border p-3 sm:p-6rounded-lg shadow bg-white space-y-2">
        <p className="sm:text-lg text-sm font-medium">📧 Email: {user.email}</p>
        <p className="sm:text-lg text-sm ">🏠 Address: {user.address}</p>
        {/* <p className="sm:text-lg text-sm ">🌍 Country: {user.country}</p> */}
        <p className="sm:text-lg text-sm ">📞 Contact: {user.contact}</p>
      </div>

      {/* Products section */}
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Products:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9">
        {[...products].map((p) => (
          <ProductItem item={p as any} key={p._id} />
        ))}
      </div>
    </div>
  );
}