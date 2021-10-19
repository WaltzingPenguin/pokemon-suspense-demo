<script>
import SuspenseList from '$lib/suspsense/suspense-list.svelte';
import Suspense from '$lib/suspsense/suspense.svelte';

import Image from './_components/image.svelte'
import LoadingCircle from './_components/loading-circle.svelte';

const favorites = [1, 4, 25, 133, 129, 79]
</script>

<svelte:head>
  <title>My Favorite Pokemon</title>
</svelte:head>

<h1>Suspense and SWR</h1>
<p>This website is a demo of using Suspense and SWR inspired techniques within the Svelte language.  Respository is available at <a href="https://github.com/WaltzingPenguin/pokemon-suspense-demo">https://github.com/WaltzingPenguin/pokemon-suspense-demo</a></p>

<h2>My Favorite Pokemon</h2>

<SuspenseList collapse>
  <ul>
    {#each favorites as id}
      <li>
        <Suspense>
          <LoadingCircle slot="loading" />
          <Image url="https://pokeapi.co/api/v2/pokemon-species/{ id }/" />
        </Suspense>
      </li>
    {/each}
  </ul>
</SuspenseList>

<style>
a {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
ul {
  display: grid;
  grid-gap: .5em;
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
