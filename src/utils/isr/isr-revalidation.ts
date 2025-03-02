import { atom } from 'nanostores';
import {httpClient} from "@/utils/http-client.ts";
import type {NotionApiTypes} from "@/utils/api/notion.api.types.ts";
import {Notion} from "@/constants/notion.constants.ts";
import {App} from "@/constants/app.constants.ts";

// Is Static Site Generator(Once on server start)
export let isSSG = atom(false);

// Is Incremental Static Regeneration(On Corn Job)
export let isISR = atom(false);

export const runSSG = () =>{
  isSSG.set(true)
  revalidation()
    .finally(() => {
      isSSG.set(false)
    })
}

export const runISR = () =>{
  isISR.set(true)
  revalidation()
    .finally(() => {
      isISR.set(false)
    })
}

export const revalidation = () => {
  console.log("Revalidating", new Date())
  return new Promise(async (resolve, reject) => {
    try {
      const searchResponse = (await httpClient.get<NotionApiTypes.SearchResponse>(`/api/notion/search?auth=${Notion.NOTION_ACCESS_TOKEN}`, {
        baseURL: App.BASE_URL,
      })).$;
      const pages = searchResponse.results.filter((page) => page.object === "page")
      await Promise.all(pages.map(item => fetch(App.BASE_URL + "/pages/" + item.id)))
      resolve(null)
    } catch (error) {
      reject(null)
    }
  })
}
