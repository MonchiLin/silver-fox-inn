import {App} from "@/constants/app.constants.ts";

let NOTION_PAGES: string[] = []
let NOTION_DATABASES: string[] = []

if (import.meta.env.NOTION_PAGES) {
  NOTION_PAGES = import.meta.env.NOTION_PAGES.split(",")
}

if (import.meta.env.NOTION_DATABASES) {
  NOTION_DATABASES = import.meta.env.NOTION_DATABASES.split(",")
}

export const Notion = {
  NOTION_ACCESS_TOKEN: import.meta.env.NOTION_ACCESS_TOKEN,
  NOTION_TOKEN_V2: import.meta.env.NOTION_TOKEN_V2,
  NOTION_PAGES: NOTION_PAGES,
  NOTION_DATABASES: NOTION_DATABASES,
  NOTION_OAUTH_CLIENT_ID: import.meta.env.NOTION_OAUTH_CLIENT_ID,
  NOTION_OAUTH_CLIENT_SECRET: import.meta.env.NOTION_OAUTH_CLIENT_SECRET,
  NOTION_OAUTH_AUTHORIZATION_URL: import.meta.env.NOTION_OAUTH_AUTHORIZATION_URL,
  NOTION_CALLBACK_URL: `${App.BASE_URL}/api/notion/oauth`,
} as const
