/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'i.pinimg.com', 'cdn.shopify.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/profile/:option',
          destination: '/profile?option=:option',
        },
      ],
    };
  }
};

module.exports = nextConfig;
