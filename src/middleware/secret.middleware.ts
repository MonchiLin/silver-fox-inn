import {defineMiddleware} from "astro:middleware";
import {App} from "@/constants/app.constants.ts";
import type {APIContext} from "astro";

const cookieToObject = (cookie: string) => {
  if (!cookie) {
    return {}
  }
  return cookie.split(";")
    .map((item) => item.split("="))
    .map(([key, value]) => [key.trim(), value.trim()])
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as Record<string, string>)
}

const shouldSkipAuth = (context: APIContext) => {
  if (App.DEV) return true;
  if (context.request.method !== "GET") return true;
  if (context.url.pathname.startsWith("/secrets")) return false;
  return true;
};

export const secretMiddleware = defineMiddleware(async (context, next) => {
  if (shouldSkipAuth(context)) {
    return next();
  }
  const cookie = context.request.headers.get("cookie") || ""
  if (context.routePattern.startsWith("/secrets")) {
    const cookies = cookieToObject(cookie)
    const secret = cookies["silver-fox-inn__secret"];

    if (!secret || secret !== App.SECRET) {
      return context.redirect(`/serpent?to=${context.routePattern}`, 301);
    }
  }
  return next();
});
