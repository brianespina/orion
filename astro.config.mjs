// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://orioncreators.gg',
  build: {
    // One stylesheet for the whole site — it is small enough that a second
    // request costs more than the bytes saved by splitting it.
    inlineStylesheets: 'never',
  },
});
