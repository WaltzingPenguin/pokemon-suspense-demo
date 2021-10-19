<script lang="ts">
import { derived, writable } from 'svelte/store'
import { STATUS, setContext } from './suspense-list-context'

export let collapse = false

const children = writable([])
const loading = derived(children, $children => {
	const index = $children.findIndex(i => !i)
	if (index === -1) {
		return $children.length
	} else {
		return index
	}
})

setContext(register)

function register () {
  const index = $children.length
  $children[index] = false

  function onFinished () {
    $children[index] = true
  }

  const isReady = derived(loading, $loading => {
    if (index < $loading) return STATUS.READY
    if (index === $loading) return STATUS.LOADING
    return (collapse ? STATUS.HIDDEN : STATUS.LOADING)
  })

  return {
    onFinished,
    isReady
  }
}
</script>

<slot />
