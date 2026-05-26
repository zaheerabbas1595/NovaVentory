import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSiteUrl } from './scripts/seo-domain.mjs'

const siteUrl = getSiteUrl()
const rootDir = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        privacyPolicy: resolve(rootDir, 'privacy-policy.html'),
        termsAndConditions: resolve(rootDir, 'terms-and-conditions.html'),
      },
    },
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
