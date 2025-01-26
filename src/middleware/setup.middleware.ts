import {defineMiddleware} from "astro:middleware";
import fs from "node:fs/promises";
import {CronJob} from "cron";
import {ISR} from "@/constants/isr.constants.ts";
import {runISR, runSSG} from "@/utils/isr/isr-revalidation.ts";

let isrFolderExists = false;
let job: CronJob;

export const setupMiddleware = defineMiddleware(async (context, next) => {
  if (!isrFolderExists) {
    await fs.mkdir(ISR.ROOT_PATH, {recursive: true});
    isrFolderExists = true
  }
  if (!job) {
    runSSG()
    job = new CronJob(
      ISR.SFI_ISR_REVALIDATION_CRON,
      runISR,
      null,
      true,
    )
  }
  return next();
});
