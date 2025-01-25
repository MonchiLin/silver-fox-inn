import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {Result} from "@/utils/result.ts";
import {Notion} from "@/constants/notion.constants.ts";
import {NotionLib} from "@/venders/notion-lib.ts";

export const prerender = true;

export function getStaticPaths() {
  return Notion.NOTION_DATABASES
    .map(i => {
      return {params: {databaseId: i}}
    });
}

export const GET: APIRoute = async ({params, request}) => {
  const id = NotionLib.idToUuid(params.databaseId!)
  const response = await NotionApi.api.client.databases.retrieve({database_id: id})
  return Result.JSONResponse(response);
}
