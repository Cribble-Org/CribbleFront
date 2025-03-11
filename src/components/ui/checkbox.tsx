import React from 'react'
import { cn } from '../../lib/utils'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ className, label, ...props }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className={cn(
          "form-checkbox h-5 w-5 text-gray-600 rounded border-gray-700 bg-gray-800 focus:ring-offset-gray-900 focus:ring-gray-600",
          className
        )}
        {...props}
      />
      {label && <span className="ml-2 text-gray-300">{label}</span>}
    </label>
  )
}