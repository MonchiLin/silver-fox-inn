export interface ISRCache<P> {
  // Get a value from the cache.
  get(key: string): P | undefined;
  // Set a value in the cache.
  set(key: string, value: P, ttl: number): void;
  // Delete a value from the cache.
  del(key: string): void;

  cleanUp(): void;
  all(): Map<string, CacheEntry<P>>;
}

export type CacheEntry<P> = {
  value: P;
  expiration: number;
};
