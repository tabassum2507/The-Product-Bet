import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://blog.tabassumkhanum.in',
  integrations: [
    sitemap({
      filter: (page) => !/\/til(\/|$)/.test(new URL(page).pathname),
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
