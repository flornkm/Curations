/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.supabase.io", "images.unsplash.com", "www.notion.so"]
  }
}

module.exports = nextConfig
