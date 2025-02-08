import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {Result} from "@/utils/result.ts";
import type {NotionApiTypes} from "@/utils/api/notion.api.types.ts";

export const prerender = false

export const GET: APIRoute<NotionApiTypes.SearchParameters> = async ({request}) => {
  const searchParams = new URL(request.url).searchParams
  const params = Object.fromEntries(searchParams);
  const response = await NotionApi.api.client.search(params)
  return Result.JSONResponse(response);
}
