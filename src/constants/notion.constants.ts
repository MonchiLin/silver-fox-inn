import {App} from "@/constants/app.constants.ts";

export const Notion = {
  NOTION_TOKEN: import.meta.env.NOTION_TOKEN,
  NOTION_PAGE_ID: import.meta.env.NOTION_PAGE_ID,
  NOTION_OAUTH_CLIENT_ID: import.meta.env.NOTION_OAUTH_CLIENT_ID,
  NOTION_OAUTH_CLIENT_SECRET: import.meta.env.NOTION_OAUTH_CLIENT_SECRET,
  NOTION_OAUTH_AUTHORIZATION_URL: import.meta.env.NOTION_OAUTH_AUTHORIZATION_URL,
  NOTION_CALLBACK_URL: `${App.BASE_URL}/api/notion/oauth`,
}
