<script lang="ts">
import { createSuspense } from "$lib/suspsense"
import { writable } from 'svelte/store'
const suspend = createSuspense()

export let alt: string
export let src: string

const image_loaded = suspend(writable<boolean>(undefined))
// Use onLoad for both load and error.
// Not willing to go to an error screen over one broken image.
const onLoad = () => image_loaded.set(true)
</script>

<img { alt } { src } on:error={ onLoad } on:load={ onLoad } />
