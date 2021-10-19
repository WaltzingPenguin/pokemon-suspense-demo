import { readable, writable } from 'svelte/store'
import type { Readable, Writable } from 'svelte/store'
import { createSuspense } from '$lib/suspsense'

type CacheObject<T> = {
  data: Writable<undefined | T>
  error: Writable<undefined | Error>
  current_request: undefined | Promise<void>
  initial_request: undefined | Promise<void>
  timestamp: number
}
let cache = new Map<string, CacheObject<unknown>>()


function makeReadable<T> (store: Writable<T>) {
  return {
    subscribe: store.subscribe
  } as Readable<T>
}


export function clear() {
  cache = new Map()
}


export function mutate<T> (key: string, fn: (value: T) => (T)) {
  const store = cache.get(key) as CacheObject<T>
  if (store) {
    store.data.update(value => {
      if (value !== undefined) {
        return fn(value)
      }
    })
  }
}


type useSWROptions<T> = {
  fetcher?: (key: string) => Promise<T>
  max_age?: number
  suspend?: boolean
}
export function useSWR<T> (key: undefined | string, options: useSWROptions<T> = {}) {
  if (key === undefined) {
    return {
      data: readable(undefined),
      error: readable(undefined)
    }
  }

  const {
    fetcher = (url) => fetch(url).then(r => r.json()),
    max_age
  } = options

  let store = cache.get(key) as CacheObject<T>
	if (!store) {
		store = {
			data: writable<T>(),
      error: writable(),
			current_request: undefined,
      initial_request: undefined,
			timestamp: Date.now()
		}
		cache.set(key, store)
	}

  const revalidate = () => {
    store.timestamp = Date.now()

    const request = fetcher(key).then((data: T) => {
      store.data.set(data)
      store.error.set(undefined)
		}).catch(error => {
      store.error.set(error)
    }).finally(() => {
			store.current_request = undefined
    })
    store.current_request = request
    return request
  }

  if (!store.initial_request) {
    store.initial_request = revalidate()
  } else if (!store.current_request) {
    if (typeof max_age !== 'undefined' && Date.now() - max_age > store.timestamp) {
      revalidate()
    }
  }

  if (options.suspend) {
    const suspend = createSuspense()
    suspend(store.data, store.error)
  }

  return {
    data: makeReadable(store.data),
    error: makeReadable(store.error)
  }
}
