/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dev.abc-concierge.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // experimental: {} // можно удалить, если больше ничего нет
};

export default nextConfig;
