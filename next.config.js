/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gcg3official.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.gcg3official.com',
        pathname: '/wp-content/**',
      },
    ],
  },
};

module.exports = nextConfig;
