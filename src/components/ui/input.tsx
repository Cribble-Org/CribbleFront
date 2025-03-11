import React from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "block w-full rounded-md border-gray-700 bg-gray-800 text-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm",
        className
      )}
      {...props}
    />
  )
}