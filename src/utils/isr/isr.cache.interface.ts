export interface ISRCache {
  get(key: string): Promise<CacheEntry | undefined>;

  set(key: string, value: Response, ttl: number): Promise<void>;

  del(key: string): Promise<void>;

  cleanUp(): Promise<void>;

  clear(): Promise<void>;

  all(): Promise<Map<string, CacheEntry>>;
}

export type CacheEntry = {
  state: Response;
  expiration: number;
};
