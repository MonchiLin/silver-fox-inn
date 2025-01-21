import {NotionAPI as NotionClient} from "notion-client";
import {Client} from "@notionhq/client";
import {Notion} from "@/constants/notion.constants.ts";

export namespace NotionApi {
  export const api = new NotionClient({
    authToken: Notion.NOTION_TOKEN,
  })

  export const client = new Client({
    auth: Notion.NOTION_TOKEN,
  })

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

  export const getCallbackUrl = () => {
    return `https://api.notion.com/v1/oauth/authorize?client_id=${Notion.NOTION_OAUTH_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${decodeURIComponent(Notion.NOTION_CALLBACK_URL)}`
  }
}
