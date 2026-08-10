// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://orioncreators.gg',
  integrations: [
    sitemap({
      // 404 is noindex; listing it would contradict the page's own meta.
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
  build: {
    // One stylesheet for the whole site — it is small enough that a second
    // request costs more than the bytes saved by splitting it.
    inlineStylesheets: 'never',
  },
});
