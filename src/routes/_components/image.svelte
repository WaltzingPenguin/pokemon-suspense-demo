<script lang="ts">
import { getVariety, getPokemon } from '../_data'
import SuspendImage from './suspend-image.svelte'

export let url: string

$: pokemon = getPokemon(url)
$: variety = getVariety($pokemon?.default_variety)

function getId (url: string) {
  return url.split('https://pokeapi.co/api/v2/pokemon-species/')[1]
}
</script>

<a href="/{ getId(url) }">
  <figure>
    <SuspendImage alt="" src={ $variety?.image } />
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
