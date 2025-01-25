import path from "path";
import os from "os";
import {snakeCase} from "lodash-es";

const PUBLIC_HOSTING_URL = import.meta.env.PUBLIC_HOSTING_URL
const BASE_URL = new URL(PUBLIC_HOSTING_URL)

function getCacheRoot() {
  return os.tmpdir()

  if (process.argv.includes("dev")) {
    return path.join(process.cwd(), 'public', 'isr')
  }
  if (process.argv.includes("build")) {
    return path.join(process.cwd(), 'public', 'isr')
  }
  if (process.argv.includes("preview")) {
    return path.join(process.cwd(), 'client', 'isr')
  }
  const last = process.argv[process.argv.length - 1]
  if (last.endsWith("js")) {
    return path.join(process.cwd(), 'client', 'isr')
  }

  return path.join(process.cwd())
}

function getISRCacheRoot() {
  return path.join(getCacheRoot(), snakeCase("silver-fox-inn"), 'isr')
}

export const App = {
  SSR: import.meta.env.SSR,
  DEV: import.meta.env.DEV,
  BASE_URL: BASE_URL.origin,
  SECRET: import.meta.env.APP_SECRET,
  BUILD_PHASE: import.meta.env.BUILD_PHASE,
  PUBLIC_PATH: getCacheRoot(),
  ISR_CACHE_PATH: getISRCacheRoot(),
} as const
