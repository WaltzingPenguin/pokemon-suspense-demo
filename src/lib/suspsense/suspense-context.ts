import { getContext, setContext as set } from 'svelte'
import type { Readable } from 'svelte/store'

const key = {}

function mock<T> (data: Promise<T>) : Promise<T>
function mock<T> (data: Readable<T>, error?: Readable<Error>) : Readable<T>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mock (data, error = undefined) {
  return data
}
export function createSuspense () {
  return (getContext(key) as typeof mock) || mock
}


export function setContext<T> (value: T) {
  set(key, value)
}
