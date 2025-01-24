import type {CacheEntry, ISRCache} from "@/utils/isr/isr.cache.interface.ts";

export class ISRCacheMemory implements ISRCache {
  private cache: Map<string, CacheEntry> = new Map();

  constructor() {
    setInterval(() => this.cleanUp(), 60 * 1000);
  }

  get(key: string): CacheEntry | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (entry.expiration < Date.now()) return undefined;
    return entry;
  }

  set(key: string, value: Response, ttl: number): void {
    this.cache.set(key, {
      state: value,
      expiration: Date.now() + ttl * 1000,
    });
  }

  del(key: string): void {
    this.cache.delete(key);
  }

  all() {
    return this.cache;
  }

  /**
   * Clean up expired entries from the cache.
   */
  cleanUp() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiration < now) {
        this.cache.delete(key);
      }
    }
  }
}
