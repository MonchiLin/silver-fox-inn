import {defineMiddleware} from "astro:middleware";
import {App} from "@/constants/app.constants.ts";
import type {APIContext} from "astro";

const shouldSkipAuth = (context: APIContext) => {
  if (App.DEV) return true;
  if (context.request.method !== "GET") return true;
  if (context.url.pathname.startsWith("/secrets")) return false;
  if (context.url.pathname.startsWith("/api/secrets")) return false;
  return true;
};

export const secretMiddleware = defineMiddleware(async (context, next) => {
  if (shouldSkipAuth(context)) {
    return next();
  }

  if (context.url.pathname.startsWith("/secrets")) {
    const secret = context.cookies.get(App.SECRET_COOKIE_KEY)?.value;

    if (!secret || secret !== App.SECRET) {
      return context.redirect(`/serpent?to=${context.url.pathname}`, 301);
    }
  }
  return next();
});
