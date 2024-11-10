/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['webapp.jacobmiranda.com'], // Add your domain here
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webapp.jacobmiranda.com',
      },
    ],
  },
};

export default nextConfig;
