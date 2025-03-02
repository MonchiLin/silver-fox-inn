// @ts-check
import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import {loadEnv} from "vite";
import sitemap from '@astrojs/sitemap';
import compressor from 'astro-compressor';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import partytown from "@astrojs/partytown";
import tailwindcss from "@tailwindcss/vite";

// @ts-ignore
const {APP_HOSTING_URL} = loadEnv(process.env.NODE_ENV, process.cwd(), "");

const argv = process.argv

/** @type {import('astro').AstroIntegration | null} */
let adapter = node({
  mode: 'standalone'
})

if (argv.includes("--adapter")) {
  if (argv.includes("vercel")) {
    adapter = vercel({
      webAnalytics: {
        enabled: true,
      },
      isr: true,
      imageService: true,
    })
  } else if (argv.includes("netlify")) {
    adapter = netlify({
      imageCDN: true,
      cacheOnDemandPages: true,
    })
  }
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sitemap(),
    compressor(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    {
      name: "inject-corn",
      hooks: {
        "astro:build:done": (options) => {
          debugger
          console.log("injecting corn", options)
        }
      }
    }
  ],
  adapter: adapter,
  output: "server",
  site: APP_HOSTING_URL,
  vite: {
    plugins: [tailwindcss()],
  },
});
