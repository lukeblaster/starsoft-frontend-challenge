import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'softstar.s3.amazonaws.com',
            },
        ],
    },
    sassOptions: {
        additionalData: `@use '@/styles/_main.module.scss' as *; @use '@/styles/_mixins.scss' as *;`,
    },
};

export default nextConfig;