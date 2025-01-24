import {defineMiddleware} from "astro:middleware";
import type {APIContext} from "astro";
import {isrService} from "@/utils/isr/isr.server.ts";

const shouldSkipCache = (req: APIContext) => {
  // Skip the cache if the request is not a GET request.
  if (req.request.method !== "GET") return true;
  if (req.request.url.startsWith("/secrets")) return true;
  if (req.request.url.startsWith("/api")) return true;
};

export const onRequest = defineMiddleware(async (context, next) => {
  const key = context.url.pathname;
  console.log("[Middleware] onRequest", key);

  let ttl: undefined | number;
  context.locals.cache = (seconds: number = 60) => (ttl = seconds);

  if (shouldSkipCache(context)) return next();
  const cachedResponse = isrService.get(key);
  if (cachedResponse) return cachedResponse.state;

  const response = await next();
  if (ttl !== undefined) isrService.set(key, response, ttl);

  return next();
});
