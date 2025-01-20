import type {APIRoute} from "astro"
import {NotionApi} from "@/venders/notion-api.ts";
import {idToUuid} from "notion-utils";

export const GET: APIRoute = async ({params, request}) => {
  const id = idToUuid("181d8046837b8074a6c4efa6897a7f53")

  const response = await NotionApi.getPage(id)

  return new Response(JSON.stringify(response)
  )
}
