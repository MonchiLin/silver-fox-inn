import type {CacheEntry} from "@/utils/isr/isr.cache.interface.ts";

export namespace ISRApiTypes {
  export type CacheState = CacheEntry & { key: string }
}
