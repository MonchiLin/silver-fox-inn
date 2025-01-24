export interface ISRCache {
  get(key: string): CacheEntry | undefined;
  set(key: string, value: Response, ttl: number): void;
  del(key: string): void;

  cleanUp(): void;

  all(): Map<string, CacheEntry>;
}

export type CacheEntry = {
  state: Response;
  expiration: number;
};
