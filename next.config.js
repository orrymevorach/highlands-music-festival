/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'highlands-music-festival.s3.ca-central-1.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
