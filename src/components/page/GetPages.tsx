import {NotionApi} from "@/venders/notion-api.ts";

export default function GetPages() {
  const href = NotionApi.getCallbackUrl()

  return <div>
    <a href={href}>GOGO</a>
  </div>
}
