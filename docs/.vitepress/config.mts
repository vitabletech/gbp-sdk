import { defineConfig } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'

// Read package.json version dynamically
const pkgPath = join(process.cwd(), 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GBP SDK",
  description: "Enterprise-grade Google Business Profile (GBP) SDK for Node.js",

  // Set default theme to dark
  appearance: 'dark',

  // SEO Metadata & Favicon
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Google Business Profile (GBP) SDK' }],
    ['meta', { property: 'og:description', content: 'Enterprise-grade Google Business Profile (GBP) SDK for Node.js. Automatic OAuth refresh, auto-pagination, and full TypeScript support.' }],
    ['meta', { property: 'og:image', content: '/hero-graphic.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'keywords', content: 'Google Business Profile, GBP, API, SDK, Node.js, TypeScript, Google My Business, OAuth2' }],
    ['link', { rel: 'icon', href: '/favicon/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }]
  ],

  // Sitemap Generation (Requires hostname)
  sitemap: {
    hostname: 'https://vitabletech.in' // Replace with your actual documentation domain before deploying
  },

  // Enable Multi-Language (i18n)
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    // Example: Uncomment below to add Spanish. You would then need to create docs/es/...
    // es: {
    //   label: 'Español',
    //   lang: 'es',
    //   link: '/es/'
    // }
  },

  themeConfig: {
    outline: [2, 3],
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/introduction' },
      { text: 'Guides', link: '/guides/token-storage' },
      { text: 'API', link: '/api-reference/accounts' },
      { text: 'Examples', link: '/examples/express' },
      {
        text: `v${pkg.version}`,
        items: [
          { text: 'Changelog', link: 'https://github.com/vitabletech/gbp-sdk/releases' },
          { text: 'NPM', link: 'https://www.npmjs.com/package/@vitabletech/gbp-sdk' }
        ]
      }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/getting-started/introduction' },
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Quick Start', link: '/getting-started/quick-start' },
          { text: 'Authentication', link: '/getting-started/authentication' },
          { text: 'FAQ', link: '/faq' }
        ]
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Token Storage', link: '/guides/token-storage' },
          { text: 'Pagination', link: '/guides/pagination' },
          { text: 'Rate Limiting & Retries', link: '/guides/rate-limiting' },
          { text: 'Custom Requests', link: '/guides/custom-requests' },
          { text: 'Error Handling', link: '/guides/error-handling' }
        ]
      },
      {
        text: 'API Reference',
        collapsed: false,
        items: [
          { text: 'Accounts', link: '/api-reference/accounts' },
          { text: 'Locations', link: '/api-reference/locations' },
          { text: 'Reviews', link: '/api-reference/reviews' },
          { text: 'Categories', link: '/api-reference/categories' },
          { text: 'Media', link: '/api-reference/media' },
          { text: 'Posts', link: '/api-reference/posts' },
          { text: 'Raw Types (Auto)', link: '/api/' }
        ]
      },
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Express.js', link: '/examples/express' },
          { text: 'Service Wrapper (Node.js)', link: '/examples/service-wrapper' },
          { text: 'Accounts', link: '/examples/accounts' },
          { text: 'Locations', link: '/examples/locations' },
          { text: 'Reviews', link: '/examples/reviews' },
          { text: 'Categories', link: '/examples/categories' },
          { text: 'Media', link: '/examples/media' },
          { text: 'Posts', link: '/examples/posts' }
        ]
      },
      {
        text: 'Advanced',
        collapsed: true,
        items: [
          { text: 'Architecture', link: '/advanced/architecture' },
          { text: 'Comparison vs Fetch', link: '/advanced/comparison' },
          { text: 'Network Whitelist', link: '/advanced/network-whitelist' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vitabletech/gbp-sdk' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
        },
        link: 'https://vitabletech.in'
      },
      { icon: 'facebook', link: 'https://www.facebook.com/vitabletech' },
      { icon: 'youtube', link: 'https://www.youtube.com/@vitabletech' },
      { icon: 'instagram', link: 'https://www.instagram.com/vitabletech' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/vitabletech' }
    ],

    footer: {
      message: 'Developed by <a href="https://github.com/msrajawat298" target="_blank">Mayank Singh kushwah</a>',
      copyright: 'Copyright © 2026 <a href="https://vitabletech.in" target="_blank">Vitabletech</a>'
    }
  }
})
