/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Windows dev ortamında asset yükleme sorunlarını azaltmak için
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
