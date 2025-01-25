import {sequence} from "astro:middleware";
import {cacheMiddleware} from "@/middleware/cache.middleware.ts";
import {secretMiddleware} from "@/middleware/secret.middleware.ts";

export const onRequest = sequence(secretMiddleware, cacheMiddleware);
