/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASEURL: "http://127.0.0.1:5002/",
  },
  images: {
    domains: ["images.pexels.com", "images.cdn.appfolio.com"],
  },
};

export default nextConfig;
