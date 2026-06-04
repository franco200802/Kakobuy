/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    // Allow local images from public folder
    unoptimized: false,
  },
  // Improve performance
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
