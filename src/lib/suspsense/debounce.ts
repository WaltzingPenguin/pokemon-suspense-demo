const startTimer = (globalThis.requestAnimationFrame || setTimeout)
const clearTimer = (globalThis.cancelAnimationFrame || clearTimeout)

type func = ((...args: unknown[]) => unknown)
export default function debounce<T extends func> (fn: T) {
  let timer: number

  return function (...args: Parameters<T>) {
    clearTimer(timer)
    timer = startTimer(() => {
      fn(...args)
    })
  }
}
