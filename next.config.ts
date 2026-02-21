import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'softstar.s3.amazonaws.com',
      },
    ],
    qualities: [75, 100],
  },
  sassOptions: {
    additionalData: `@use '@/styles/_main.scss' as *; @use '@/styles/_mixins.scss' as *;`,
  },
  experimental: {
    optimizePackageImports: ['@hugeicons/react', '@hugeicons/core-free-icons'],
  },
};

export default nextConfig;
