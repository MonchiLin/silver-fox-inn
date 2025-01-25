import {defineMiddleware} from "astro:middleware";
import {isrService} from "@/utils/isr/isr.server.ts";
import type {APIContext} from "astro";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '../..')

function getCacheRoot() {
  if (import.meta.env.DEV) {
    return path.join(PROJECT_ROOT, 'public', 'cache') // 开发环境使用源码目录
  }

  return path.join(PROJECT_ROOT, 'dist', 'isr')
}

const shouldSkipCache = (context: APIContext) => {
  // if (App.DEV) return true;
  if (context.request.method !== "GET") return true;
  if (context.url.pathname.startsWith("/pages")) return false;
  return true;
};

export const cacheMiddleware = defineMiddleware(async (context, next) => {

  const filePath = path.join(getCacheRoot(), `xx.json`)
  console.log("filePath", process.cwd())

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
