/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_ACCESS_TOKEN: string;
  readonly NOTION_TOKEN_V2: string;
  readonly NOTION_PAGES: string;
  readonly NOTION_DATABASES: string;
  readonly NOTION_OAUTH_CLIENT_ID: string;
  readonly NOTION_OAUTH_CLIENT_SECRET: string;
  readonly NOTION_OAUTH_AUTHORIZATION_URL: string;
  readonly PUBLIC_HOSTING_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

namespace App {
  interface Locals {
    // This will allow us to set the cache duration for each page.
    cache(seconds: number): void;
  }
}
