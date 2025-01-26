import type {APIContext, APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {Result} from "@/utils/result.ts";
import {isrService} from "@/utils/isr/isr.server.ts";
import {ISR} from "@/constants/isr.constants.ts";
import {App} from "@/constants/app.constants.ts";

export const prerender = false;

const shouldSkipCache = () => {
  if (App.DEV && !ISR.SFI_ISR_ENABLE_ON_DEV) return true;
  return false;
};

export const GET: APIRoute = async ({params, request}) => {
  const pathname = new URL(request.url).pathname;
  if (shouldSkipCache()) {
    const response = await NotionApi.getPage(params.pageId!)
    return Result.JSONResponse(response);
  }

  const cachedResponse = await isrService.get(pathname);
  if (cachedResponse) {
    const result = await cachedResponse.state.json()
    return Result.JSONResponse(result);
  }

  const response = await NotionApi.getPage(params.pageId!)
  const blob = new Blob([JSON.stringify(response, null, 2)], {type: 'application/json'});
  const init = {status: 200, statusText: "OK"};
  await isrService.set(pathname, new Response(blob, init), ISR.SFI_ISR_TIMEOUT_IN_MS)
  return Result.JSONResponse(response);
}
