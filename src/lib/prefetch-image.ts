import { createSuspense } from "@svelte-drama/suspense"
import { writable } from 'svelte/store'

export default function prefetchImage (src: string) {
  if (!src) return

  const suspend = createSuspense()
  const image_loaded = suspend(writable<boolean>(undefined))
  const onLoad = () => image_loaded.set(true)

  const img = new Image()
  // Use onLoad for both load and error.
  // Not willing to go to an error screen over one broken image.
  img.onload = onLoad
  img.onerror = onLoad
  img.src = src
}
