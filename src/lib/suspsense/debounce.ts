type func = ((...args: unknown[]) => void)
export default function debounce<T extends func> (fn: T) {
  let timer: number

  return function (...args: Parameters<T>) {
    cancelAnimationFrame(timer)
    timer = requestAnimationFrame(() => {
      fn(...args)
    })
  }
}
