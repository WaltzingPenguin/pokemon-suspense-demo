import type { Writable } from 'svelte/store'


export type CacheObject<T> = {
  data: Writable<undefined | T>
  error: Writable<undefined | Error>
  current_request: undefined | Promise<void>
  initial_request: undefined | Promise<void>
  timestamp: number
}
export const cache = new Map<string, CacheObject<unknown>>()
