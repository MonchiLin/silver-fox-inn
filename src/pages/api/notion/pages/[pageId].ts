import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {Result} from "@/utils/result.ts";
import {Notion} from "@/constants/notion.constants.ts";
import {isrService} from "@/utils/isr/isr.server.ts";
import {ISR} from "@/constants/isr.constants.ts";

export const prerender = true;

export function getStaticPaths() {
  return Notion.NOTION_PAGES
    .map(i => {
      return {params: {pageId: i}}
    });
}

export const GET: APIRoute = async ({params, request}) => {
  const pathname = new URL(request.url).pathname;
  const cachedResponse = await isrService.get(pathname);
  if (cachedResponse) {
    const result = await cachedResponse.state.json()
    return Result.JSONResponse(result);
  }
  const response = await NotionApi.getPage(params.pageId!)
  const blob = new Blob([JSON.stringify(response, null, 2)], {type: 'application/json'});
  const init = {status: 200, statusText: "success"};
  await isrService.set(pathname, new Response(blob, init), ISR.SFI_ISR_TIMEOUT_IN_MS)
  return Result.JSONResponse(response);
}
