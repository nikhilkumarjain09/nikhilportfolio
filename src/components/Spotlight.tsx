import { useEffect, useRef } from 'react'

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const x = e.clientX
      const y = e.clientY
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
        }
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed w-[600px] h-[600px] -left-[300px] -top-[300px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)] transition-transform duration-300 ease-out"
      style={{
        transform: 'translate3d(-1000px, -1000px, 0)',
        willChange: 'transform'
      }}
    />
  )
}
