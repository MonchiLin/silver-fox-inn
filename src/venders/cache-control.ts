import CacheControlParser from "cache-control-parser";

export namespace CacheControl {
  export const shouldBypassCache = (request: Request) => {
    const cacheControl = request.headers.get("Cache-Control")
    if (!cacheControl) {
      return false
    }
    const directives = CacheControlParser.parse(cacheControl);
    return Boolean(directives["no-cache"] || directives["max-age"] === 0);
  }

  export const isResponseExpired = (response: Response) => {
    response
  }

  export const stringify = (cacheControl: CacheControlParser.CacheControl) => {
    return CacheControlParser.stringify(cacheControl)
  }

  export const update = (headers: Headers, cacheControl: CacheControlParser.CacheControl) => {
    const cacheControlStr = headers.get("Cache-Control") || ""
    let object = CacheControlParser.parse(cacheControlStr)
    object = {
      ...object,
      ...cacheControl,
    }
    return CacheControlParser.stringify(object);
  }

}
