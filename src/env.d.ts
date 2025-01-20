interface ImportMetaEnv {
  readonly NOTION_TOKEN: string;
  readonly NOTION_PAGE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
