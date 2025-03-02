let BASE_URL: URL
if (typeof window === "undefined") {
  const APP_HOSTING_URL = import.meta.env.APP_HOSTING_URL
  BASE_URL = new URL(APP_HOSTING_URL)
} else {
  BASE_URL = new URL(window.location.origin)
}

export const App = {
  SSR: import.meta.env.SSR,
  DEV: import.meta.env.DEV,
  APP_ISR_BACKEND: import.meta.env.APP_ISR_BACKEND,
  BASE_URL: BASE_URL.origin,
  SECRET: import.meta.env.APP_SECRET,
  CRON_SECRET: import.meta.env.CRON_SECRET,
  SECRET_COOKIE_KEY: "silver-fox-inn__secret"
} as const
