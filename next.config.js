/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // www.iconpacks.net
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
