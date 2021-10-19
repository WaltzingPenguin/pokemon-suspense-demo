<script lang="ts">
import Image from './image.svelte'
import { getPokemon } from '../_data'

export let url: string

$: pokemon = getPokemon(url)
</script>

{#if $pokemon?.evolves_from}
  <h2>Evolves From</h2>
  <div>
    <Image url={ $pokemon.evolves_from } />
  </div>
{/if}

<style>
div {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
}
</style>
