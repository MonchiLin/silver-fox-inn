import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {Result} from "@/utils/result.ts";
import {Notion} from "@/constants/notion.constants.ts";

export const prerender = true;

export function getStaticPaths() {
  return Notion.NOTION_PAGES
    .map(i => {
      return {params: {pageId: i}}
    });
}

export const GET: APIRoute = async ({params, request}) => {
  const response = await NotionApi.api.getPage(params.pageId!)
  return Result.JSONResponse(response);
}
