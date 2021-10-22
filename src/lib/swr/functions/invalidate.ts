import { getOrCreate } from "../cache"

export function invalidate (key: string) {
  const store = getOrCreate(key)
  store.last_update = Date.now()
  store.stale = true
}
