import { cache } from '../cache'
import type { CacheObject } from '../cache'

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
