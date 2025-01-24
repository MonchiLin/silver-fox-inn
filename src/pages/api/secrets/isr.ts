import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {isrService} from "@/utils/isr/isr.server.ts";

export const GET: APIRoute = async () => {
  return Result.JSONResponse(Object.fromEntries(isrService.all()));
}

export const DELETE: APIRoute = async () => {
  isrService.cleanUp();
  return Result.JSONResponse(null);
}
