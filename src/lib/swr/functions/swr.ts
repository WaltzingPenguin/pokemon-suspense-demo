import { derived, readable } from 'svelte/store'
import { createSuspense } from '$lib/suspsense'
import { getOrCreate } from '../cache'
import { update as updateCache } from './update'
import type { CacheObject } from '../cache'
import type { Updater } from './update'
import type { Readable, Writable } from 'svelte/store'


function createRevalidate<T> (key: string, store: CacheObject<T>, fetcher: (key: string) => Promise<T>) {
  return async function () {
    if (store.is_loading) return

    store.is_loading = true
    try {
      await updateCache(key, () => fetcher(key))
    } catch (e) {
      console.error(e)
    }
    store.is_loading = false
  }
}


function makeReadable<T> (store: Writable<T>, onSubscribe: Readable<unknown>) {
  return derived([store, onSubscribe], ([$store]) => $store)
}


type SWRResult<T> = {
  data: Readable<T | undefined>,
  error: Readable<Error | undefined>,
  update: (fn: Updater<T>) => Promise<T | undefined>
}
const emptyKeyMock = {
  data: readable(undefined),
  error: readable(undefined),
  update: async () => undefined
}


type Fetcher<T> = (key: string) => Promise<T>
type SWROptions<T> = {
  fetcher?: Fetcher<T>
  maxAge?: number
  suspend?: boolean
}
export function swr<T> (key: string | undefined, fetcher: Fetcher<T>): SWRResult<T>;
export function swr<T> (key?: string, options?: SWROptions<T>): SWRResult<T>;
export function swr<T> (key: string | undefined, options: Fetcher<T> | SWROptions<T> = {}): SWRResult<T> {
  if (typeof options === 'function') {
    options = {
      fetcher: options
    } as SWROptions<T>
  }

  if (!key) {
    return emptyKeyMock
  }

  const {
    fetcher = (url: string) => fetch(url).then(r => r.json()),
    maxAge,
    suspend = false
  } = options

  const store = getOrCreate<T>(key)
  const revalidate = createRevalidate(key, store, fetcher)

  const onSubscribe = readable(undefined, () => {
    if (!store.last_update || store.stale) {
      revalidate()
    } else if (maxAge !== undefined && Date.now() - maxAge > store.last_update) {
      revalidate()
    }
  
    if (suspend) {
      const suspendStore = createSuspense()
      suspendStore(store.data, store.error)
    }
  })

  return {
    data: makeReadable(store.data, onSubscribe),
    error: makeReadable(store.error, onSubscribe),
    update<T> (fn: Updater<T>) {
      return updateCache<T>(key, fn)
    }
  }
}
