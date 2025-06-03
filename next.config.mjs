/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dev.abc-concierge.com"],
    remotePatterns: [
      {
        protocol: 'http', // БЫЛО https, стало http
        hostname: 'dev.abc-concierge.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
