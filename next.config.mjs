/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Optimización para Vercel
  swcMinify: true,
};

export default nextConfig;
