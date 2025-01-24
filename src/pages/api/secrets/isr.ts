import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {isrService} from "@/utils/isr/isr.server.ts";

export const GET: APIRoute = async () => {
  return Result.JSONResponse(isrService.all());
}

export const DELETE: APIRoute = async ({request}) => {
  const body = await request.json()
  if (body.key) {
    isrService.del(body.key)
  } else {
    isrService.cleanUp();
  }
  return Result.JSONResponse(null);
}
