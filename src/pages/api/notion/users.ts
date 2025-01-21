import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {idToUuid} from "notion-utils";
import {Notion} from "@/constants/notion.constants.ts";

export const GET: APIRoute = async ({params, request}) => {
  const id = idToUuid(Notion.NOTION_PAGE_ID)

  const response = await NotionApi.api.getPage(id)

  return new Response(JSON.stringify(response))
}
