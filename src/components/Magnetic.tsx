import React, { useEffect, useRef } from 'react'
import { useFinePointerDesktop } from './useFinePointer'
import clsx from 'clsx'

type MagneticProps = {
  children: React.ReactNode
  className?: string
  strength?: number
  disabled?: boolean
}

export function Magnetic({ children, className, strength = 10, disabled }: MagneticProps) {
  const finePointerDesktop = useFinePointerDesktop()
  const ref = useRef<HTMLDivElement | null>(null)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (disabled || !finePointerDesktop) return

    const onMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - (rect.left + rect.width / 2)
      const y = e.clientY - (rect.top + rect.height / 2)
      const dx = (x / rect.width) * strength
      const dy = (y / rect.height) * strength

      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        if (!ref.current) return
        ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      })
    }

    const onLeave = () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        if (!ref.current) return
        ref.current.style.transform = 'translate3d(0,0,0)'
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [disabled, finePointerDesktop, strength])

  return (
    <div
      ref={ref}
      className={clsx('transition-transform duration-200 will-change-transform', className)}
    >
      {children}
    </div>
  )
}


