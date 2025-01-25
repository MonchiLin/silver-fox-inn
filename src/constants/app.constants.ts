import path from "path";

const PUBLIC_HOSTING_URL = import.meta.env.PUBLIC_HOSTING_URL
const BASE_URL = new URL(PUBLIC_HOSTING_URL)

function getCacheRoot() {
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
  BUILD_PHASE: import.meta.env.BUILD_PHASE,
  PUBLIC_PATH: getCacheRoot(),
  ISR_CACHE_PATH: getISRCacheRoot(),
} as const

const p1 = import.meta.env
const p2 = process.env
const p3 = process.argv

console.log("meta Env", p1)
console.log("process Env", p2)
console.log("process Argv", p3)
