/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "books.google.com",
      },
    ],
  },
};

export default nextConfig;
