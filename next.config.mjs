/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dev.abc-concierge.com"], // Укажите ваш хост
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
