import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {isrService} from "@/utils/isr/isr.server.ts";

export const GET: APIRoute = async () => {
  return Result.JSONResponse(await isrService.all());
}

export const DELETE: APIRoute = async ({request}) => {
  let body
  try {
    body = await request.json()
  } catch (e) {
  }

  if (body?.key) {
    await isrService.del(body.key)
  } else {
    await isrService.clear();
  }
  return Result.JSONResponse(null);
}
