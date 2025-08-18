'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sapphire-400 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-gradient-to-r from-sapphire-500 to-primary-600 hover:from-sapphire-600 hover:to-primary-700 text-white transform hover:scale-105 hover:shadow-glow',
      secondary: 'bg-transparent border-2 border-sapphire-500 text-sapphire-400 hover:bg-sapphire-500 hover:text-white transform hover:scale-105',
      ghost: 'bg-transparent text-sapphire-400 hover:text-white hover:bg-sapphire-500/10',
      outline: 'bg-transparent border border-dark-600 text-white hover:border-sapphire-500 hover:text-sapphire-400'
    }
    
    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-md',
      md: 'h-11 px-6 rounded-lg',
      lg: 'h-14 px-8 text-lg rounded-xl'
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button } 