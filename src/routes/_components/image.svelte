<script lang="ts">
import { getPokemon, getVariety } from '$lib/data'
import { createSuspense } from "@svelte-drama/suspense"
import { writable } from 'svelte/store'
const suspend = createSuspense()

export let url: string
$: pokemon = getPokemon(url)
$: variety = getVariety($pokemon?.default_variety)
$: prefetchImage($variety?.image)

function prefetchImage (src: string) {
  if (!src) return

  const image_loaded = suspend(writable<boolean>(undefined))
  const onLoad = () => image_loaded.set(true)

  const img = new Image()
  // Use onLoad for both load and error.
  // Not willing to go to an error screen over one broken image.
  img.onload = onLoad
  img.onerror = onLoad
  img.src = src
}
</script>

<img alt=""  src={ $variety?.image } />

<style>
img {
  height: 96px;
  width: 96px;
}
</style>
