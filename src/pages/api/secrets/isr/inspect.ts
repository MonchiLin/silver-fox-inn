import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {openExplorer} from "@/venders/open-file-explorer";
import {ISR} from "@/constants/isr.constants.ts";

export const GET: APIRoute = async (context) => {
  openExplorer(ISR.ROOT_PATH, () => {})
  return Result.JSONResponse(null);
}
