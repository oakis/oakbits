/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "bits.swebowl.se" }],
  },
  pageExtensions: ["page.tsx", "api.ts"],
  productionBrowserSourceMaps: true,
};

export default nextConfig;
