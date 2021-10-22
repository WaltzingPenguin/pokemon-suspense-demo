import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export type CacheObject<T> = {
  data: Writable<T | undefined>
  error: Writable<Error | undefined>
  is_loading: boolean
  last_update: number | undefined
  stale: boolean
}
export const cache = new Map<string, CacheObject<unknown>>()

function createCacheItem<T> (key: string) {
  const store: CacheObject<T> = {
    data: writable<T>(),
    error: writable(),
    is_loading: false,
    last_update: undefined,
    stale: true
  }
  cache.set(key, store)
  return store
}

export function getOrCreate<T> (key: string) {
  return (
    cache.get(key) as CacheObject<T>
    || createCacheItem<T>(key)
  )
}
