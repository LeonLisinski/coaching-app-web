import { useEffect, useRef } from 'react'

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Fallback: ensure all elements become visible after 1.5s
    // in case IntersectionObserver doesn't fire (e.g. small viewports)
    const fallback = setTimeout(() => {
      node.querySelectorAll('.rev').forEach((el) => el.classList.add('vis'))
    }, 1500)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('vis')
        })
      },
      { threshold: 0.05 }
    )
    node.querySelectorAll('.rev').forEach((el) => observer.observe(el))
    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])

  return ref
}
