/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/list?category=11&page=1",
        permanent: true, // triggers 308
      },
    ];
  },
};

export default nextConfig;
