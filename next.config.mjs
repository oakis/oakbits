/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "bits.swebowl.se" }],
  },
  pageExtensions: ['tsx'],
};

export default nextConfig;
