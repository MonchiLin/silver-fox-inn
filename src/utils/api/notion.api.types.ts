import type {Result} from "@/utils/result.ts";
import type Types from "@notionhq/client/build/src/api-endpoints";

type WithAuth<P> = P & {
  auth?: string;
};

export namespace NotionApiTypes {
  export type SearchResponse = Types.SearchResponse
  export type GetDatabaseResponse = Types.GetDatabaseResponse
  export type GetPageResponse = Types.GetPageResponse

  export type SearchParameters = WithAuth<Types.SearchParameters>
}
