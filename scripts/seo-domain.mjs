const fallbackSiteUrl = 'https://novaventory.vercel.app'

export function getSiteUrl() {
  const rawUrl =
    process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    fallbackSiteUrl

  const withProtocol = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`

  return withProtocol.replace(/\/$/, '')
}
