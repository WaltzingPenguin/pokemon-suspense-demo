<script lang="ts">
import { getPokemon } from '$lib/data'
import Image from './image.svelte'

export let id: number

$: pokemon = getPokemon(id)
</script>

<a href="/{ id }">
  <figure>
    <Image { id } />
    <figcaption>{ $pokemon?.name }</figcaption>
  </figure>
</a>

<style>
a {
  background-color: #FFF;
  border: 1px solid #EEE;
  color: inherit;
  display: block;
  text-decoration: inherit;
}
a:focus,
a:hover {
  background-color: #F1F1F4;
  border-color: #CCD;
}
figure {
  margin: 0;
  padding: .5em 1em 1em;
  text-align: center;
}
</style>
