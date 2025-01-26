import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {Notion} from "@/constants/notion.constants.ts";
import {App} from "@/constants/app.constants.ts";

export const GET: APIRoute = async () => {
  await Promise.all(Notion.NOTION_PAGES.map(i => fetch(App.BASE_URL + "/pages/" + i)))

  return Result.JSONResponse(null);
}
