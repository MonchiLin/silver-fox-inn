import {readFile, rename, unlink, writeFile} from "fs/promises";
import {join} from "path";
import type {CacheEntry, ISRCache} from "@/utils/isr/isr.cache.interface.ts";
import {ISR} from "@/constants/isr.constants.ts";

type CacheMeta = {
  expiration: number;
  size: number;
};

const DECODE_REGEX = /%(2[346B]|5E|60|7C)/g;
const SANITIZE_REGEX = /[^a-zA-Z0-9\-_~.]/g;

export class IsrCacheFilesystem implements ISRCache {
  private readonly cachePath: string;
  private index: Record<string, CacheMeta> = {};
  private indexLoaded = false;

  constructor() {
    this.cachePath = ISR.ROOT_PATH;
    this.loadIndex().catch(console.error);
  }

  private get indexPath() {
    return join(this.cachePath, '__index.json');
  }

  private async loadIndex() {
    try {
      const data = await this.safeReadFile(this.indexPath);
      this.index = data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Failed to load index:', error);
      this.index = {};
    } finally {
      this.indexLoaded = true;
    }
  }

  private async saveIndex() {
    const tmpPath = this.indexPath + '.tmp';
    await writeFile(tmpPath, JSON.stringify(this.index));
    await rename(tmpPath, this.indexPath);
  }

  private async ensureReady(): Promise<void> {
    if (!this.indexLoaded) {
      await new Promise(resolve => setTimeout(resolve, 10));
      return this.ensureReady();
    }
    return Promise.resolve()
  }

  private sanitizeKey(key: string): string {
    return encodeURIComponent(key)
      .replace(DECODE_REGEX, decodeURIComponent)
      .replace(SANITIZE_REGEX, '');
  }

  private getCacheFilePath(key: string): string {
    return join(this.cachePath, `${this.sanitizeKey(key)}.json`);
  }

  private async safeReadFile(path: string): Promise<string | null> {
    try {
      return await readFile(path, "utf-8");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw error;
    }
  }

  private async safeUnlink(path: string): Promise<void> {
    try {
      await unlink(path);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    }
  }

  private parseResponse(data: any): CacheEntry {
    return {
      state: new Response(data.state.body, {
        status: data.state.status,
        statusText: data.state.statusText,
        headers: new Headers(data.state.headers),
      }),
      expiration: data.expiration
    };
  }

  async get(key: string) {
    await this.ensureReady();
    const filePath = this.getCacheFilePath(key);

    try {
      const data = await this.safeReadFile(filePath);
      if (!data) return undefined;

      const parsed = JSON.parse(data);

      if (parsed.expiration < Date.now()) {
        await this.safeUnlink(filePath);
        delete this.index[key];
        return undefined;
      }

      return this.parseResponse(parsed);
    } catch (error) {
      await this.del(key);
      return undefined;
    }
  }

  async set(key: string, value: Response, ttl: number) {
    await this.ensureReady();
    const filePath = this.getCacheFilePath(key);
    const tmpPath = filePath + '.tmp';

    const headers: Record<string, string> = {};
    value.headers.forEach((v, k) => (headers[k] = v));

    const body = await value.text();

    const state = {
      status: value.status,
      statusText: value.statusText,
      headers,
      body
    };

    const expiration = Date.now() + ttl;
    const entry = {
      state: {
        status: state.status,
        statusText: state.statusText,
        headers: state.headers,
        body: body,
      },
      expiration
    };

    await writeFile(tmpPath, JSON.stringify(entry));
    await rename(tmpPath, filePath);

    this.index[key] = {
      expiration,
      size: Buffer.byteLength(JSON.stringify(entry))
    };
    await this.saveIndex();
  }

  async del(key: string) {
    await this.ensureReady();
    const filePath = this.getCacheFilePath(key);

    await this.safeUnlink(filePath);
    if (this.index[key]) {
      delete this.index[key];
      await this.saveIndex();
    }

    return Promise.resolve()
  }

  async cleanUp() {
    await this.ensureReady();
    const now = Date.now();

    await this.parallelWithConcurrency(
      Object.entries(this.index)
        .filter(([_, meta]) => meta.expiration < now)
        .map(([key]) => async () => this.del(key)),
      10
    );
  }

  async clear() {
    await this.ensureReady();
    const keys = Object.keys(this.index);

    await this.parallelWithConcurrency(
      keys.map(key => async () => {
        await this.safeUnlink(this.getCacheFilePath(key));
      }),
      10
    );

    this.index = {};
    await this.saveIndex();
  }

  async all(): Promise<Map<string, CacheEntry>> {
    await this.ensureReady();
    const entries = new Map<string, CacheEntry>();

    await this.parallelWithConcurrency(
      Object.keys(this.index).map(key => async () => {
        const entry = await this.get(key);
        if (entry) entries.set(key, entry);
      }),
      10
    );

    return entries;
  }

  private async parallelWithConcurrency<T>(
    tasks: (() => Promise<T>)[],
    concurrency: number
  ): Promise<T[]> {
    const results: T[] = [];
    const queue = [...tasks];

    await Promise.all(
      Array(Math.min(concurrency, queue.length)).fill(0).map(async () => {
        while (queue.length) {
          const task = queue.shift()!;
          results.push(await task());
        }
      })
    );

    return results;
  }
}
