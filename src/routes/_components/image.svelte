<script lang="ts">
import { getPokemon, getVariety } from '$lib/data'
import prefetchImage from '$lib/prefetch-image'

export let id: number
$: pokemon = getPokemon(id)
$: variety = getVariety($pokemon?.default_variety)
$: prefetchImage($variety?.image)
</script>

<img alt=""  src={ $variety?.image } />

<style>
img {
  height: 96px;
  width: 96px;
}
</style>
