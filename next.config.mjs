/** @type {import('next').NextConfig} */
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim().replace(/[\r\n]/g, "").replace(/\/$/, "");

const nextConfig = {
  experimental: {
    cpus: 2
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "pub-c7a22068052144a5805830c30d280128.r2.dev"
      }
    ]
  },
  async rewrites() {
    if (!adminUrl) return [];
    return {
      afterFiles: [
        { source: "/admin", destination: `${adminUrl}/admin` },
        { source: "/admin/:path*", destination: `${adminUrl}/admin/:path*` },
        { source: "/api/admin/:path*", destination: `${adminUrl}/api/admin/:path*` }
      ]
    };
  }
};

export default nextConfig;
