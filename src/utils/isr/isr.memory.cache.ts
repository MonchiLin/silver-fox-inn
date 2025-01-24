import type {CacheEntry, ISRCache} from "@/utils/isr/isr.cache.interface.ts";

export class MemoryCache<P> implements ISRCache<P> {
  private cache: Map<string, CacheEntry<P>> = new Map();

  constructor() {
    setInterval(() => this.cleanUp(), 60 * 1000);
  }

  get(key: string): P | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (entry.expiration < Date.now()) return undefined;
    return entry.value;
  }

  set(key: string, value: P, ttl: number): void {
    this.cache.set(key, {
      value,
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
