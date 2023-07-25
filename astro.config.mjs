import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https:/ExeAy.github.io',
  base: '/swgoh-sas-farm-guide'
  integrations: [react(), tailwind()],
})
