import type Types from "@notionhq/client/build/src/api-endpoints";

type WithAuth<P> = P & {
  auth?: string;
};

export namespace NotionApiTypes {
  export type SearchResponse = Types.SearchResponse
  export type GetDatabaseResponse = Types.GetDatabaseResponse
  export type GetPageResponse = Types.GetPageResponse

  export type SearchParameters = WithAuth<Types.SearchParameters>
  export type AnalyticsParameters = { pageId: number, spaceId: number }
  export type AnalyticsResponse = {
    ds: string
    totalViews: number
    uniqueViews: number
  }
}
