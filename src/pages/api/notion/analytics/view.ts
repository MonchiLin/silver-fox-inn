import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import type {NotionApiTypes} from "@/utils/api/notion.api.types.ts";
import {httpClient} from "@/utils/http-client.ts";
import {Notion} from "@/constants/notion.constants.ts";

export const prerender = false

type View = {
  ds: string
  total_views: number
  unique_views: number
}

export const POST: APIRoute = async ({request}) => {
  const payload = await request.json() as NotionApiTypes.AnalyticsParameters;
  const url = 'https://www.notion.so/api/v3/getPageAnalytics';
  const headers = {
    'content-type': 'application/json',
    Cookie: `token_v2=${Notion.NOTION_TOKEN_V2};`
  }

  const result = (await httpClient.post<View[]>(url, {
    headers: headers,
    withCredentials: true,
    data: payload
  }))

  const data = result.$.map(i => {
    return {
      ds: i.ds,
      totalViews: i.total_views,
      uniqueViews: i.unique_views
    } as NotionApiTypes.AnalyticsResponse
  })

  return Result.JSONResponse(data);
}
