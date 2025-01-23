const PUBLIC_HOSTING_URL = import.meta.env.PUBLIC_HOSTING_URL
const BASE_URL = new URL(PUBLIC_HOSTING_URL)

export const App = {
  SSR: import.meta.env.SSR,
  DEV: import.meta.env.DEV,
  BASE_URL: BASE_URL.origin,
} as const
