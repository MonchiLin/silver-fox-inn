import type {APIRoute} from "astro"
import {App} from "@/constants/app.constants.ts";
import {NotionApi} from "@/venders/notion-api.ts";

export const prerender = false

export const GET: APIRoute = async ({params, request}) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    return Response.redirect(App.BASE_URL + '/error', 302);
  }

  const token = await NotionApi.getAccessToken(code)

  // Authentication failed
  if (token.error) {
    return Response.redirect(App.BASE_URL + '/error', 302);
  }

  const accessToken = token.access_token

  return Response.redirect(App.BASE_URL + '/notion/oauth?accessToken=' + accessToken, 302);
}
