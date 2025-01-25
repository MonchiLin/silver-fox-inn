import {defineMiddleware} from "astro:middleware";
import {isrService} from "@/utils/isr/isr.server.ts";
import {App} from "@/constants/app.constants.ts";
import type {APIContext} from "astro";

const shouldSkipCache = (context: APIContext) => {
  // if (App.DEV) return true;
  if (context.request.method !== "GET") return true;
  if (context.url.pathname.startsWith("/pages")) return false;
  return true;
};

export const cacheMiddleware = defineMiddleware(async (context, next) => {
  const key = context.url.pathname;
  let ttl: undefined | number;
  context.locals.cache = (seconds: number = 60) => (ttl = seconds);

  if (shouldSkipCache(context)) return next();
  const cachedResponse = isrService.get(key);
  if (cachedResponse) return cachedResponse.state;

  const response = await next();
  if (ttl !== undefined) isrService.set(key, response, ttl);

  return next();
});
