<script lang="ts">
import Link from './link.svelte'
import { getPokemon } from '$lib/data'

export let id: number

$: pokemon = getPokemon(id)
</script>

{#if $pokemon?.evolves_from}
  <h2>Evolves From</h2>
  <div>
    <Link id={ $pokemon.evolves_from } />
  </div>
{/if}

<style>
div {
  display: grid;
  grid-gap: .5em;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
}
</style>
