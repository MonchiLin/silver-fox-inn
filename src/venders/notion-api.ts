import {Notion} from "@/constants/notion.constants.ts";
import {idToUuid as _idToUuid} from "notion-utils";
import {Client} from '@notionhq/client'
import {NotionCompatAPI} from 'notion-compat'
import {nanoid} from "nanoid";
import {withRateLimit} from "@/utils/rate-limiter.ts";

export namespace NotionApi {

  export const api = new NotionCompatAPI(new Client({auth: Notion.NOTION_ACCESS_TOKEN}))

  export const getPage = (rawPageId: string) => {
    console.log("Fetching page", rawPageId)
    return api.getPage(rawPageId)
  }

  export const getAccessToken = (code: string) => {
    const encoded = Buffer.from(`${Notion.NOTION_OAUTH_CLIENT_ID}:${Notion.NOTION_OAUTH_CLIENT_SECRET}`).toString("base64");

    return fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: Notion.NOTION_CALLBACK_URL,
      }),
    })
      .then(res => res.json());
  }

  export const getNotionAuthorizationUrl = () => {
    return `https://api.notion.com/v1/oauth/authorize?client_id=${Notion.NOTION_OAUTH_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${decodeURIComponent(Notion.NOTION_CALLBACK_URL)}&state=${nanoid()}`
  }

  export const idToUuid = _idToUuid;
  export const uuidToId = (uuid: string) => uuid;
}
