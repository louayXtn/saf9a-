/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"], // السماح بعرض الصور من 
  },
  typescript: {
    ignoreBuildErrors: true, // السماح ببناء المشروع حتى إذا كان هناك أخطاء في TypeScript
  },
};

module.exports = nextConfig;