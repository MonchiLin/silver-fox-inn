import path from "path";
import os from "os";
import {snakeCase} from "lodash-es";

function getISRRootPath() {
  return path.join(os.tmpdir(), snakeCase("silver-fox-inn"), 'isr')
}

export const ISR = {
  ROOT_PATH: getISRRootPath(),
  SFI_ISR_BACKEND: import.meta.env.SFI_ISR_BACKEND || "File",
  SFI_ISR_TIMEOUT_IN_SECONDS: import.meta.env.SFI_ISR_TIMEOUT_IN_SECONDS || 604800,
} as const

console.log("ISR", ISR)
