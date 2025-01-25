let BASE_URL: URL
if (typeof window === "undefined") {
  const SFI_HOSTING_URL = import.meta.env.SFI_HOSTING_URL
  BASE_URL = new URL(SFI_HOSTING_URL)
} else {
  BASE_URL = new URL(window.location.origin)
}

export const App = {
  SSR: import.meta.env.SSR,
  DEV: import.meta.env.DEV,
  SFI_ISR_BACKEND: import.meta.env.SFI_ISR_BACKEND,
  BASE_URL: BASE_URL.origin,
  SECRET: import.meta.env.SFI_SECRET,
  SECRET_COOKIE_KEY: "silver-fox-inn__secret"
} as const
