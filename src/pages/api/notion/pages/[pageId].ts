import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {Result} from "@/utils/result.ts";

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const {params, request} = context
  context.locals.cache()
  const response = await NotionApi.getPage(params.pageId!)
  return Result.JSONResponse(response);
}
