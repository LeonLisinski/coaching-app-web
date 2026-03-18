'use client'

import { useEffect } from 'react'

export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('vis')
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.rev').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
