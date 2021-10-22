import { get } from 'svelte/store'
import { getOrCreate } from '../cache'

export type Updater<T> =  (value?: T) => T | Promise<T | undefined> | undefined

export async function update<T> (key: string, fn: Updater<T>) {
  const store = getOrCreate<T>(key)
  const start_update = Date.now()
  const shouldUpdate = () => !store.last_update || start_update > store.last_update

  const current = get(store.data)
  try {
    const result = await fn(current)
    if (result === undefined) {
      return
    }
    if (shouldUpdate()) {
      store.data.set(result)
      store.error.set(undefined)
      store.last_update = Date.now()
      store.stale = false
    }
    return result
  } catch (e) {
    if (shouldUpdate()) {
      store.error.set(e)
      store.last_update = Date.now()
    }
    throw e
  }
}
