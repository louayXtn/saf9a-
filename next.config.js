/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"], // السماح بعرض الصور من 
    formats: ['image/avif', 'image/webp'], // Enable modern image formats for better performance
  },
  typescript: {
    ignoreBuildErrors: true, // السماح ببناء المشروع حتى إذا كان هناك أخطاء في TypeScript
  },
  // Enable compression for better performance
  compress: true,
  // Generate ETags for better caching
  generateEtags: true,
  // Optimize page rendering
  reactStrictMode: true,
  // Enable SWC minification for better performance
  swcMinify: true,
  // Trailing slash for better SEO
  trailingSlash: false,
  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;