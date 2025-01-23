import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {Result} from "@/utils/result.ts";
import type {NotionApiTypes} from "@/utils/api/notion.api.types.ts";

export const GET: APIRoute<NotionApiTypes.SearchParameters> = async ({params = {}, request}) => {
  const response = await NotionApi.api.client.search(params)

  return Result.JSONResponse(response);
}
