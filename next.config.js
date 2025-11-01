/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { serverActions: { allowedOrigins: ['*'] } },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SB_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SB_PUBLISHABLE_KEY,
  },
}

module.exports = nextConfig 