import type {CacheEntry, ISRCache} from "./isr.cache.interface.ts";
import {ISRCacheMemory} from "./isr.cache.memory.ts";
import {type ISRApiTypes} from "@/utils/api/isr.api.types.ts";

export class ISRService {
  constructor(private cache: ISRCache) {
  }

  all(): ISRApiTypes.CacheState[] {
    return [...this.cache.all()]
      .map(([key, value]) => {
        return {
          ...value,
          key,
        }
      })
  }

  get(key: string): CacheEntry | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: Response, ttl: number): void {
    // Clone the response so that we don't modify the original.
    this.cache.set(key, value.clone(), ttl);
  }

  del(key: string): void {
    this.cache.del(key);
  }

  cleanUp() {
    this.cache.cleanUp();
  }
}

const cache = new ISRCacheMemory();
export const isrService = new ISRService(cache);
