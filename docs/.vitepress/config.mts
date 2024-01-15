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
  
  // SEO Metadata
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Google Business Profile (GBP) SDK' }],
    ['meta', { property: 'og:description', content: 'Enterprise-grade Google Business Profile (GBP) SDK for Node.js. Automatic OAuth refresh, auto-pagination, and full TypeScript support.' }],
    ['meta', { property: 'og:image', content: '/hero-graphic.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'keywords', content: 'Google Business Profile, GBP, API, SDK, Node.js, TypeScript, Google My Business, OAuth2' }]
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
          { text: 'Comparison vs Fetch', link: '/advanced/comparison' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vitabletech/gbp-sdk' }
    ],

    footer: {
      message: 'Developed by <a href="https://github.com/msrajawat298" target="_blank">Mayank Singh kushwah</a>',
      copyright: 'Copyright © 2026 <a href="https://vitabletech.in" target="_blank">Vitabletech</a>'
    }
  }
})
