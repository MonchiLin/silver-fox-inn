import type {GeneratorApiTypes} from "@/utils/api/generator.api.types.ts";

export function downloadEnvFile(params: GeneratorApiTypes.EnvParameters) {
  let content = '';

  if (params.notionAccessToken) {
    content += `NOTION_TOKEN=${params.notionAccessToken}\n`
  }

  if (Array.isArray(params.notionPages) && params.notionPages.length > 0) {
    content += `NOTION_PAGES=${params.notionPages.join(",")}\n`
  }

  if (Array.isArray(params.notionDatabases) && params.notionDatabases.length > 0) {
    content += `NOTION_DATABASES=${params.notionDatabases.join(",")}\n`
  }

  const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `env`;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getEnvFileBlobURL(params: GeneratorApiTypes.EnvParameters) {
  let content = '';

  if (params.notionAccessToken) {
    content += `NOTION_TOKEN=${params.notionAccessToken}\n`
  }

  if (Array.isArray(params.notionPages) && params.notionPages.length > 0) {
    content += `NOTION_PAGES=${params.notionPages.map(i => i.replaceAll("-", "")).join(",")}\n`
  }

  if (Array.isArray(params.notionDatabases) && params.notionDatabases.length > 0) {
    content += `NOTION_DATABASES=${params.notionDatabases.map(i => i.replaceAll("-", "")).join(",")}\n`
  }

  const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });

  const url = URL.createObjectURL(blob);

  return url
}
