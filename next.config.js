/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'i.pinimg.com', 'cdn.shopify.com'],
  },
};

module.exports = nextConfig;
