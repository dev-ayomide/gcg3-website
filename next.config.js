/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gcg3official.com',
        pathname: '/wp-content/**',
      },
    ],
  },
};

module.exports = nextConfig;
