import { createSuspense } from "$lib/suspsense"
import { writable } from 'svelte/store'

export function waitForImage () {
  const suspend = createSuspense()

  const image_loaded = writable<boolean>(undefined)
  suspend(image_loaded)
  return () => image_loaded.set(true)
}
