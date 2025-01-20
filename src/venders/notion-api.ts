import {Envs} from "../constants/env.constants.ts";
import {NotionAPI} from "notion-client";

export const NotionApi = new NotionAPI({
  authToken: Envs.NOTION_TOKEN,
})
