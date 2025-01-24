import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {isrService} from "@/utils/isr/isr.server.ts";

export const GET: APIRoute = async ({ params, request }) => {
  return Result.JSONResponse(isrService.get(params.isrId!));
}

export const DELETE: APIRoute = async ({ params, request }) => {
  isrService.del(params.isrId!);
  return Result.JSONResponse(null);
}
