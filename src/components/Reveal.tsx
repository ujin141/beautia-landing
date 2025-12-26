import { motion, type MotionProps } from 'framer-motion'
import React from 'react'
import clsx from 'clsx'

type RevealProps = MotionProps & {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0, ...rest }: RevealProps) {
  return (
    <span className={clsx('inline-block overflow-hidden align-top pb-[10px]', className)}>
      <motion.span
        className="inline-block"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        {...rest}
      >
        {children}
      </motion.span>
    </span>
  )
}


