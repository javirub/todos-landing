// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

/**
 * Where this site believes it lives, which is what canonical links, hreflang, the
 * sitemap and the Open Graph image URL are built from.
 *
 * The deployment's own production URL is the fallback rather than the real domain, so
 * that a preview build links to the preview instead of quietly pointing every canonical
 * at production. Setting SITE_URL in the Vercel project is what pins it.
 */
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321')

// https://astro.build/config
export default defineConfig({
  site,

  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es-ES' } } })],

  vite: { plugins: [tailwindcss()] },

  i18n: {
    // English at the root, Spanish under /es/. The product is written in English --
    // the README, the board, every tool description -- and its readers are Claude Code
    // users, so the URLs say that rather than pretending otherwise.
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
})
