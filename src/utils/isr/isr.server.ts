import type {CacheEntry, ISRCache} from "./isr.cache.interface.ts";
import {type ISRApiTypes} from "@/utils/api/isr.api.types.ts";
import {IsrCacheFilesystem} from "./isr.cache.filesystem.ts";
import {ISR} from "@/constants/isr.constants.ts";

export class ISRService {
  constructor(private cache: ISRCache) {
  }

  async all(): Promise<ISRApiTypes.CacheState[]> {
    return [...await this.cache.all()]
      .map(([key, value]) => {
        return {
          ...value,
          key,
        }
      })
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: Object, ttl: number): Promise<void>
  set(key: string, value: Response, ttl: number): Promise<void> {
    if (value instanceof Response) {
      return this.cache.set(key, value.clone(), ttl);
    } else {
      const blob = new Blob([JSON.stringify(value, null, 2)], {type: 'application/json'});
      const init = {status: 200, statusText: "OK"};
      const response = new Response(blob, init)
      return this.cache.set(key, response, ttl);
    }
  }

  del(key: string) {
    return this.cache.del(key);
  }

  cleanUp() {
    return this.cache.cleanUp();
  }

  clear() {
    return this.cache.clear();
  }
}

const cache = new IsrCacheFilesystem(ISR.ROOT_PATH, ISR.VERSION)
export const isrService = new ISRService(cache);
