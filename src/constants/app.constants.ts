const PUBLIC_HOSTING_URL = import.meta.env.PUBLIC_HOSTING_URL
const BASE_URL = new URL(PUBLIC_HOSTING_URL)

export const App = {
  SSR: import.meta.env.SSR,
  DEV: import.meta.env.DEV,
  SFI_ISR_BACKEND: import.meta.env.SFI_ISR_BACKEND,
  BASE_URL: BASE_URL.origin,
  SECRET: import.meta.env.APP_SECRET,
} as const
