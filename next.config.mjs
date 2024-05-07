/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  logging: {
    fetches: {
      fullUrl: true,
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      }
    ]
  }
};

export default nextConfig;
