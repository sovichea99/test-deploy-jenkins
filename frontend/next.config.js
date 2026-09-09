/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // small production image, no need for full node_modules at runtime
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081",
  },
};

module.exports = nextConfig;
