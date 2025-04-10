'use client'
import { useRef, ReactNode } from 'react'
import { motion } from 'motion/react'
import useInView from '@/hooks/useInView'


type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade'

type ScrollRevealProps = {
  children: ReactNode
  direction?: AnimationDirection
  duration?: number
  delay?: number
  className?: string
  distance?: number
  once?: boolean
  threshold?: number
}

export function ScrollReveal({
  children,
  direction = 'up',
  duration = 0.6,
  delay = 0,
  className = '',
  distance = 50,
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref as React.RefObject<HTMLElement>, {
    threshold,
    rootMargin: '0px 0px -10% 0px',
  })

  // Define animation variants based on direction
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x:
        direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth animation
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView || !once ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
