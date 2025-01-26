import {defineMiddleware} from "astro:middleware";
import {isrService} from "@/utils/isr/isr.server.ts";
import type {APIContext} from "astro";
import {ISR} from "@/constants/isr.constants.ts";
import {App} from "@/constants/app.constants.ts";

const shouldSkipCache = (context: APIContext) => {
  if (App.DEV && !ISR.SFI_ISR_ENABLE_ON_DEV) return true;
  if (context.request.method !== "GET") return true;
  if (context.url.pathname.startsWith("/now")) return false;
  if (context.url.pathname.startsWith("/pages")) return false;
  if (context.url.pathname.startsWith("/api/notion")) return false;
  if (context.url.pathname.startsWith("/api/notion/database")) return false;
  return true;
};

export const isrMiddleware = defineMiddleware(async (context, next) => {
  const key = context.url.pathname;
  let ttl: undefined | number;
  context.locals.cache = (seconds = ISR.SFI_ISR_TIMEOUT_IN_MS) => (ttl = seconds);

  if (shouldSkipCache(context)) return next();
  const cachedResponse = await isrService.get(key);
  if (cachedResponse) {
    return cachedResponse.state;
  }

  const response = await next();
  if (ttl !== undefined) {
    await isrService.set(key, response, ttl)
  }

  return next();
});
