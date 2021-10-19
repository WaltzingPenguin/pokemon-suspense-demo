<script lang="ts">
import debounce from './debounce'
import { createEventDispatcher } from 'svelte'
import { derived, writable } from 'svelte/store'
import type { Readable } from 'svelte/store'

import { setContext } from './suspense-context'
import {
  getContext as getListContext,
  setContext as setListContext,
  STATUS as LIST_STATUS
} from './suspense-list-context'

const dispatch = createEventDispatcher()
const is_browser = (typeof window !== 'undefined')

const { isReady: list_state, onFinished } = getListContext()
setListContext()

type PendingStore = Readable<{
  data?: unknown,
  error?: Error
}>
let pending: PendingStore[] = []
$: pending_values = derived(pending, $pending => $pending)

$: error = $pending_values.find(item => item.error)?.error
$: error && dispatch('error', error)

// Debounce to prevent dispatching multiple events when
// requests are chained.
const dispatchLoaded = debounce(() => {
  if (!loading && !error) {
    dispatch('load')
    onFinished()
  }
})
$: loading = !is_browser || $pending_values.some(item => !item.data)
$: !loading && !error && dispatchLoaded()

setContext(suspend)

function suspend<T> (data: Readable<T> | Promise<T>, error?: Readable<Error>) {
  if ('subscribe' in data) {
    return suspendStore(data, error)
  } else {
    return suspendPromise(data)
  }
}

function suspendStore<T> (data_store: Readable<T>, error_store: Readable<Error>) {
  const store = derived([data_store, error_store], ([data, error]) => {
    if (data !== undefined) {
      return { data }
    } else if (error) {
      return { error }
    } else {
      return {}
    }
  })
  pending.push(store)
  pending = pending
  return data_store
}

function suspendPromise<T> (promise: Promise<T>) {
  const store = writable({})
  promise
    .then(data => store.set({ data }))
    .catch(error => store.set({ error }))
  pending.push(store)
  pending = pending
  return promise
}
</script>

{#if error}
  {#if $list_state !== LIST_STATUS.HIDDEN}
    <slot name="error" { error }></slot>
  {/if}
{:else}
  {#if $list_state === LIST_STATUS.HIDDEN}
    <!-- Hidden -->
  {:else if loading || $list_state === LIST_STATUS.LOADING}
    <slot name="loading"></slot>
  {/if}

  {#if is_browser}
    <div hidden={ loading || $list_state !== LIST_STATUS.READY }>
      <slot { suspend } />	
    </div>
  {/if}
{/if}

<style>
div:not([hidden]) {
  display: contents;
}
</style>
