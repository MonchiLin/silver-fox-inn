import path from "path";
import os from "os";
import {snakeCase} from "lodash-es";

function getISRRootPath() {
  return path.join(os.tmpdir(), snakeCase("silver-fox-inn"), 'isr')
}

const APP_ISR_ENABLE_ON_DEV = (import.meta.env.APP_ISR_ENABLE_ON_DEV || "").toLowerCase();
const APP_ISR_TIMEOUT_IN_SECONDS = Number(import.meta.env.APP_ISR_TTL || 604800);

export const ISR = {
  ROOT_PATH: getISRRootPath(),
  APP_ISR_BACKEND: import.meta.env.APP_ISR_BACKEND || "File",
  APP_ISR_TTL: APP_ISR_TIMEOUT_IN_SECONDS,
  APP_ISR_ENABLE_ON_DEV: APP_ISR_ENABLE_ON_DEV === "" || APP_ISR_ENABLE_ON_DEV === "y",
  APP_ISR_REVALIDATION_CRON: (import.meta.env.APP_ISR_REVALIDATION_CRON || "0 0 * * *"),
  VERSION: 0,
} as const
