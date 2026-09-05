import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Quando as fotos passarem a vir de um CMS/Storage, basta liberar o host aqui.
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  /**
   * O site virou página única. Estas rotas chegaram a ir ao ar como páginas
   * separadas, então quem tiver o link antigo cai na âncora certa em vez de
   * num 404.
   *
   * Temporário (307) de propósito enquanto o site está em ajuste com a
   * cliente: um 308 fica cacheado no navegador e trava a decisão. Vira
   * permanente quando a estrutura estiver fechada e o domínio no ar.
   */
  async redirects() {
    return [
      { source: "/servicos", destination: "/#servicos", permanent: false },
      { source: "/protocolos", destination: "/#protocolos", permanent: false },
      { source: "/sobre", destination: "/#sobre", permanent: false },
      { source: "/contato", destination: "/#contato", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
