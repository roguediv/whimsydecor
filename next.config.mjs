/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['webapp.jacobmiranda.com'], // Add your domain here
  },
  async headers() {
    return [
      {
        source: '/images/uploads/:path*', // Matches all images in the uploads directory
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store', // Ensures the browser does not cache images
          },
        ],
      },
    ];
  },
};

export default nextConfig;
