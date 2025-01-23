// @ts-check
import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwind from '@astrojs/tailwind';
import {loadEnv} from "vite";
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';

import node from '@astrojs/node';

// @ts-ignore
const env = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const argv = process.argv

/** @type {import('astro').AstroIntegration | null} */
let adapter;

if (argv.includes("adapter")) {
  if (argv.includes("vercel")) {
    adapter = vercel({
      webAnalytics: {
        enabled: true,
      },
      isr: true,
      imageService: true,
    })
  } else {
    adapter = node({
      mode: 'standalone'
    })
  }
} else {
  adapter = node({
    mode: 'standalone'
  })
}

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), sitemap(), compressor()],
  adapter: adapter,
  output: "static",
  site: env.PUBLIC_HOSTING_URL,
});
