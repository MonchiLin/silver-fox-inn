import {sequence} from "astro:middleware";
import {isrMiddleware} from "@/middleware/isr.middleware.ts";
import {secretMiddleware} from "@/middleware/secret.middleware.ts";
import {setupMiddleware} from "@/middleware/setup.middleware.ts";

export const onRequest = sequence(
  setupMiddleware,
  secretMiddleware,
  isrMiddleware
);
