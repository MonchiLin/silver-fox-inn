import type {CacheEntry, ISRCache} from "./isr.cache.interface.ts";
import {type ISRApiTypes} from "@/utils/api/isr.api.types.ts";
import {IsrCacheFilesystem} from "./isr.cache.filesystem.ts";

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

  set(key: string, value: Response, ttl: number) {
    return this.cache.set(key, value.clone(), ttl);
  }

  del(key: string) {
    return this.cache.del(key);
  }

  cleanUp() {
    return this.cache.cleanUp();
  }
}

const cache = new IsrCacheFilesystem()
export const isrService = new ISRService(cache);
