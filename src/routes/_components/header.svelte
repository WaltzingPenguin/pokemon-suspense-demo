<script lang="ts">
import { Suspense } from '@svelte-drama/suspense'
import { getPokemon } from '$lib/data'
import Image from './image.svelte'

export let id: number

$: pokemon = getPokemon(id)
</script>

<svelte:head>
  <title>{ $pokemon?.name || "Loading..." }</title>
</svelte:head>

<section>
  <h1>{ $pokemon?.name }</h1>
  <div>
    <Suspense>
      <Image {id} />
    </Suspense>
  </div>
  <p>{ $pokemon?.description }</p>
</section>

<style>
section {
  align-items: center;
  display: grid;
  grid-gap: 0 1em;
  grid-template: "title image" "description description" / 1fr 96px;
}
@media (min-width: 35rem) {
  section {
    grid-template: "image title" "image description" / 96px 1fr;
  }
}
h1 {
  align-self: center;
  grid-area: title;
  margin: 0;
}
div {
  align-self: flex-start;
  grid-area: image;
}
p {
  grid-area: description;
  margin: 0;
}
</style>
