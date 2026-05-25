import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getSiteUrl } from './scripts/seo-domain.mjs'

const siteUrl = getSiteUrl()

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
  plugins: [
    react(),
    {
      name: 'novaventory-seo-domain',
      transformIndexHtml(html) {
        return html.replaceAll('https://novaventory.vercel.app', siteUrl)
      },
    },
  ],
})
