/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './src/supabase-image-loader.js',
    domains: ["cdn.supabase.io", "images.unsplash.com", "www.notion.so"]
  }
}

module.exports = nextConfig
