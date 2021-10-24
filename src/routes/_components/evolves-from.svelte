<script lang="ts">
import Link from './link.svelte'
import { getPokemon } from '$lib/data'

export let url: string

$: pokemon = getPokemon(url)
</script>

{#if $pokemon?.evolves_from}
  <h2>Evolves From</h2>
  <div>
    <Link url={ $pokemon.evolves_from } />
  </div>
{/if}

<style>
div {
  display: grid;
  grid-gap: .5em;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
}
</style>
