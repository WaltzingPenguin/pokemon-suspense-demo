<script lant="ts">
import Header from './_components/header.svelte'
import ErrorDisplay from './_components/error.svelte'
import EvolvesInto from './_components/evolves-into.svelte'
import EvolvesFrom from './_components/evolves-from.svelte'
import LoadingCircle from './_components/loading-circle.svelte'
import LoadingDots from './_components/loading-dots.svelte'
import { Suspense, SuspenseList } from '$lib/suspsense'
import { page } from '$app/stores'

$: id = $page.params.id
$: url = `https://pokeapi.co/api/v2/pokemon-species/${ id }/`
</script>

<p>
  <a href="/">My Favorite Pokemon</a>
</p>

{#key url}
  <SuspenseList collapse>
    <Suspense>
      <Header { url } />
      <LoadingCircle slot="loading" />
      <ErrorDisplay slot="error" />
    </Suspense>

    <Suspense>
      <EvolvesFrom { url } />
      <LoadingDots slot="loading" />
      <ErrorDisplay slot="error" />
    </Suspense>

    <Suspense>
      <EvolvesInto { url } />
      <LoadingDots slot="loading" />
      <ErrorDisplay slot="error" />
    </Suspense> 
  </SuspenseList>
{/key}

<style>
a {
  color: inherit;
  text-decoration: inherit;
}
p {
  font-weight: 500;
  text-align: center;
}
</style>
