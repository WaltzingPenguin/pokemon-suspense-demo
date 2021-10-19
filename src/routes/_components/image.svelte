<script lang="ts">
import { getVariety, getPokemon } from '../_data'
import { waitForImage } from '../_util'

export let url: string

$: pokemon = getPokemon(url)
$: variety = getVariety($pokemon?.default_variety)
const onLoad = waitForImage()

function getId (url: string) {
  return url.split('https://pokeapi.co/api/v2/pokemon-species/')[1]
}
</script>

<a href="/{ getId(url) }">
  <figure>
    <img alt="" src={ $variety?.image } on:load={ onLoad } />
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
img {
  height: 96px;
  width: 96px;
}
figure {
  margin: 0;
  padding: .5em 1em 1em;
  text-align: center;
}
</style>
