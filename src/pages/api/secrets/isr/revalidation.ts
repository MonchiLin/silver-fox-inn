import type {APIRoute} from "astro"
import {Result} from "@/utils/result.ts";
import {Notion} from "@/constants/notion.constants.ts";
import {App} from "@/constants/app.constants.ts";
import {revalidation} from "@/utils/isr/isr-revalidation.ts";

export const GET: APIRoute = async () => {
  await revalidation();

  return Result.JSONResponse(null);
}
