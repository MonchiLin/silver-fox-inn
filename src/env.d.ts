interface ImportMetaEnv {
  readonly NOTION_TOKEN: string;
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
