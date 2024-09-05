/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {},
  images: {
    domains: ['inside.chandler-roofing.com'],
  },
  compiler: {
    styledComponents: true
  },
}


module.exports = nextConfig
