/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"], // السماح بعرض الصور من Cloudinary
  },
};

module.exports = nextConfig;