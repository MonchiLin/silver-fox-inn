import path from "path";
import os from "os";
import {snakeCase} from "lodash-es";

function getISRRootPath() {
  return path.join(os.tmpdir(), snakeCase("silver-fox-inn"), 'isr')
}

const SFI_ISR_ENABLE_ON_DEV = (import.meta.env.SFI_ISR_ENABLE_ON_DEV || "").toLowerCase();
const SFI_ISR_TIMEOUT_IN_SECONDS = Number(import.meta.env.SFI_ISR_TTL || 604800);

export const ISR = {
  ROOT_PATH: getISRRootPath(),
  SFI_ISR_BACKEND: import.meta.env.SFI_ISR_BACKEND || "File",
  SFI_ISR_TTL: SFI_ISR_TIMEOUT_IN_SECONDS,
  SFI_ISR_ENABLE_ON_DEV: SFI_ISR_ENABLE_ON_DEV === "" || SFI_ISR_ENABLE_ON_DEV === "y",
  VERSION: 0,
} as const
