/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly NOTION_ACCESS_TOKEN?: string;
  readonly NOTION_TOKEN_V2?: string;
  readonly NOTION_PAGES?: string;
  readonly NOTION_DATABASES?: string;
  readonly NOTION_OAUTH_CLIENT_ID?: string;
  readonly NOTION_OAUTH_CLIENT_SECRET?: string;
  readonly WOLAI_OAUTH_CLIENT_ID?: string;
  readonly WOLAI_OAUTH_CLIENT_SECRET?: string;
  readonly SFI_SECRET?: string;
  readonly SFI_HOSTING_URL: string;
  readonly SFI_ISR_BACKEND?: "File" | "Memory";
  readonly SFI_ISR_TIMEOUT_IN_SECONDS?: number;
  readonly SFI_ISR_ENABLE_ON_DEV?: "Y" | "N";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

namespace App {
  interface Locals {
    // This will allow us to set the cache duration for each page.
    cache(seconds?: number): void;
  }
}
