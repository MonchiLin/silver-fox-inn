export interface ISRCache {
  get(key: string): Promise<CacheEntry | undefined>;

  set(key: string, value: Response, ttl: number): Promise<void>;

  del(key: string): Promise<void>;

  cleanUp(): Promise<void>;

  clear(): Promise<void>;

  all(): Promise<Map<string, CacheEntry>>;
}

export type CacheEntry = {
  // cache value
  state: Response;
  // timestamp
  timestamp: number;
  // version
  version: number
  ttl: number
};

export type CacheEntryPlain = {
  // cache value
  state: {
    status: number,
    statusText: string,
    headers: Record<string, string>,
    body: string,
  };
  ttl: number,
  // timestamp
  ts: number;
  // version
  v: number
};
