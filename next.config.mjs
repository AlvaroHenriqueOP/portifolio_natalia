/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permitir carregamento de scripts de domínios confiáveis
  images: {
    domains: ['unpkg.com'],
    unoptimized: true,
  },
  // Configuração para mitigar problemas de importação CSS
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
