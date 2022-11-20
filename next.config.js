// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  env: {
    DISCORD_HOOK: "https://discord.com/api/webhooks/1043986109887156244/s8nfa1VU8eSxPnen7WXjBToMZsXb3_9zmlfJwDD6Xinun_m_fbsQZNRdBMK1XhfQrHK8"
  },
  staticPageGenerationTimeout: 300,
  images: {
    domains: [
      'www.notion.so',
      'notion.so',
      'images.unsplash.com',
      'pbs.twimg.com',
      's3.us-west-2.amazonaws.com'
    ],
    formats: ['image/avif', 'image/webp']
  }
})
