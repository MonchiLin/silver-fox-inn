import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import type {APIRoute} from "astro";
import WebsiteConfig from "../../website.config.ts";

// WIP
export const GET: APIRoute = async ({ request, site }) => {
  return rss({
    title: WebsiteConfig.title,
    description: WebsiteConfig.description,
    site: site!,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`,
  });
}
