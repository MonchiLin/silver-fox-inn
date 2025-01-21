import type {APIRoute} from "astro"
import {idToUuid} from "notion-utils";
import {Notion} from "@/constants/notion.constants.ts";
import {NotionApi} from "@/venders/notion-api.ts";

export const GET: APIRoute = async ({params, request}) => {
  const id = idToUuid(Notion.NOTION_PAGE_ID)

  const response = await NotionApi.client.search({})

  return new Response(JSON.stringify(response), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  })
}

export const POST: APIRoute = ({request}) => {
  return new Response(JSON.stringify({
      message: "This was a POST!"
    })
  )
}

export const DELETE: APIRoute = ({request}) => {
  return new Response(JSON.stringify({
      message: "This was a DELETE!"
    })
  )
}
