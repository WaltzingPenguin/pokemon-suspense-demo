<script lang="ts">
import Image from './image.svelte'
import { getEvolutions, getPokemon } from '../_data'

export let url: string

$: pokemon = getPokemon(url)
$: evolution = getEvolutions($pokemon?.evolution_chain, $pokemon?.id)
</script>

{#if $evolution?.length}
  <section>
    <h2>Evoles Into</h2>
    <ul>
      {#each $evolution as url}
        <li>
          <Image { url } />
        </li>
      {/each}
    </ul>  
  </section>
{/if}

<style>
ul {
  display: grid;
  grid-gap: .5em;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
