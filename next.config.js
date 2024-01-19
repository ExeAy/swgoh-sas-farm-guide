/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "game-assets.swgoh.gg",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/",
        destination: "/ros",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
