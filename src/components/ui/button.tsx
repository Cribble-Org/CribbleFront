import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'default', 
  size = 'md', 
  ...props 
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
        {
          'bg-gray-800 text-white hover:bg-gray-700': variant === 'default',
          'border border-gray-700 bg-transparent text-gray-300 hover:bg-gray-800': variant === 'outline',
          'bg-transparent text-gray-300 hover:bg-gray-800': variant === 'ghost',
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}