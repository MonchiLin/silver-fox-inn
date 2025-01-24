import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {isrService} from "@/utils/isr/isr.server.ts";

export const GET: APIRoute = async ({ params, request }) => {
  return Result.JSONResponse(isrService.get(params.key!));
}
