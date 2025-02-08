import {defineMiddleware} from "astro:middleware";
import {isrService} from "@/utils/isr/isr.server.ts";
import type {APIContext} from "astro";
import {ISR} from "@/constants/isr.constants.ts";
import {App} from "@/constants/app.constants.ts";
import {CacheControl} from "@/venders/cache-control.ts";

const skipISROnDev = App.DEV && ISR.APP_ISR_ENABLE_ON_DEV

const shouldSkipCache = (context: APIContext) => {
  // if (skipISROnDev) return true;
  if (context.request.method !== "GET") return true;
  if (context.url.pathname.startsWith("/now")) return false;
  if (context.url.pathname.startsWith("/pages")) return false;
  if (context.url.pathname.startsWith("/api/notion")) return false;
  if (context.url.pathname.startsWith("/api/notion/database")) return false;
  return true;
};

export const isrMiddleware = defineMiddleware(async (context, next) => {
  let ttl: undefined | number;
  context.locals.cache = (seconds = ISR.APP_ISR_TTL) => (ttl = seconds);

  if (shouldSkipCache(context)) return next();

  const key = context.url.pathname;
  const cachedResponse = await isrService.get(key);
  if (cachedResponse && !CacheControl.shouldBypassCache(context.request)) {
    return cachedResponse.state;
  }
  const response = await next();
  const expiration = (ISR.APP_ISR_TTL * 1000) + Date.now()
  const expires = new Date(expiration).toUTCString()
  response.headers.set("Expires", expires)
  const cacheControl = CacheControl.update(response.headers, {
    "max-age": ISR.APP_ISR_TTL
  })
  response.headers.set("cache-control", cacheControl)
  if (ttl !== undefined) {
    await isrService.set(key, response, ttl)
  }

  return response;
});
