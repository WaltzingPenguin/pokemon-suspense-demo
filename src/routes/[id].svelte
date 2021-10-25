<script lant="ts">
import { Suspense, SuspenseList } from '@svelte-drama/suspense'
import Header from './_components/header.svelte'
import ErrorDisplay from './_components/error.svelte'
import EvolvesInto from './_components/evolves-into.svelte'
import EvolvesFrom from './_components/evolves-from.svelte'
import LoadingCircle from './_components/loading-circle.svelte'
import LoadingDots from './_components/loading-dots.svelte'
import { page } from '$app/stores'

$: id = parseInt($page.params.id, 10)
</script>

<p>
  <a href="/">My Favorite Pokemon</a>
</p>

<SuspenseList collapse>
  <Suspense>
    <Header { id } />
    <LoadingCircle slot="loading" />
    <ErrorDisplay slot="error" />
  </Suspense>

  <Suspense>
    <EvolvesFrom { id } />
    <LoadingDots slot="loading" />
    <ErrorDisplay slot="error" />
  </Suspense>

  <Suspense>
    <EvolvesInto { id } />
    <LoadingDots slot="loading" />
    <ErrorDisplay slot="error" />
  </Suspense> 
</SuspenseList>

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
