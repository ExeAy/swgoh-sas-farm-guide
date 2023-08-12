/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "game-assets.swgoh.gg",
      },
    ],
  },
};

module.exports = nextConfig;
