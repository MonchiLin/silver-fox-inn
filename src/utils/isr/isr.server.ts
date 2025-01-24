import type {ISRCache} from "@/utils/isr/isr.cache.interface.ts";
import {MemoryCache} from "@/utils/isr/isr.memory.cache.ts";

export class ISRService implements ISRCache<Response> {
  constructor(private cache: ISRCache<Response>) {
  }

  all() {
    return this.cache.all();
  }

  get(key: string): Response | undefined {
    const result = this.cache.get(key);
    if (!result) return undefined;
    // Clone the response so that we don't modify the original.
    return result.clone();
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

const cache = new MemoryCache<Response>();
export const isrService = new ISRService(cache);

export function invalidate(key: string) {
  isrService.del(key);
}
