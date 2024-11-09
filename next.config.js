/** @type {import('next').NextConfig} */

const nextConfig = {
    // reactStrictMode: false,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    output: "standalone",
}

module.exports = nextConfig
