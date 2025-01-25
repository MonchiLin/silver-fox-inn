import {defineMiddleware} from "astro:middleware";
import fs from "node:fs/promises";
import {ISR} from "@/constants/isr.constants.ts";

let isrFolderExists = false;

export const setupMiddleware = defineMiddleware(async (context, next) => {
  // const startTime = performance.now();
  if (!isrFolderExists) {
    await fs.mkdir(ISR.ROOT_PATH, {recursive: true});
    isrFolderExists = true
  }
  // const duration = performance.now() - startTime;
  // console.log(`[ISR] duration: ${duration.toFixed(2)}ms`);
  return next();
});
