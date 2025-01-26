import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {isISR, isSSG} from "@/utils/isr/isr-revalidation.ts";

export const prerender = false

export const GET: APIRoute = async ({params, request}) => {
  return Result.JSONResponse({
    isSSG: isSSG.get(),
    isISR: isISR.get(),
  });
}
