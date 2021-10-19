<script lang="ts">
import { getVariety, getPokemon } from '../_data'
import SuspendImage from './suspend-image.svelte'

export let url: string

$: pokemon = getPokemon(url)
$: variety = getVariety($pokemon?.default_variety)
</script>

<svelte:head>
  <title>{ $pokemon?.name || "Loading..." }</title>
</svelte:head>

<section>
  <h1>{ $pokemon?.name }</h1>
  <SuspendImage alt="" src={ $variety?.image } />
  <p>{ $pokemon?.description }</p>  
</section>

<style>
section {
  align-items: center;
  display: grid;
  grid-template: "title image" "description description" / 1fr 96px;
}
@media (min-width: 35rem) {
  section {
    grid-template: "image title" "image description" / 96px 1fr;
  }
}
h1 {
  grid-area: title;
  margin: 0;
}
p {
  grid-area: description;
  margin: 0;
}
</style>
