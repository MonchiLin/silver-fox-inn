import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {idToUuid} from "notion-utils";
import {Envs} from "@/constants/env.constants.ts";

export const GET: APIRoute = async ({params, request}) => {
  const id = idToUuid(Envs.NOTION_PAGE_ID)

  const response = await NotionApi.getPage(id)

  return new Response(JSON.stringify(response))
}
