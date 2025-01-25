import path from "path";

const PUBLIC_HOSTING_URL = import.meta.env.PUBLIC_HOSTING_URL
const BASE_URL = new URL(PUBLIC_HOSTING_URL)

function getCacheRoot() {
  if (import.meta.env.DEV) {
    return path.join(process.cwd(), 'public')
  }

  return path.join(process.cwd())
}

function getISRCacheRoot() {
  return path.join(getCacheRoot(), 'isr')
}

export const App = {
  SSR: import.meta.env.SSR,
  DEV: import.meta.env.DEV,
  BASE_URL: BASE_URL.origin,
  SECRET: import.meta.env.APP_SECRET,
  PUBLIC_PATH: getCacheRoot(),
  ISR_CACHE_PATH: getISRCacheRoot(),
} as const
