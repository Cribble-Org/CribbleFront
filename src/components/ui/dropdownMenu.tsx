import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left z-10" ref={dropdownRef}>
      <div onClick={() => setIsOpen((prev) => !prev)}>{trigger}</div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-[#252134] ring-1 ring-black ring-opacity-5">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  )
}

export const DropdownMenuTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    type="button"
    className="inline-flex justify-center w-full rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-[#252134] text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
    id="options-menu"
    aria-haspopup="true"
    aria-expanded="true"
    {...props}
  >
    {children}
    <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
  </button>
)
interface DropdownMenuContentProps {
    children: React.ReactNode
  }
export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])
  
    return (
      <>
        <div onClick={() => setIsOpen(!isOpen)}></div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#252134] ring-1 ring-black ring-opacity-5" ref={dropdownRef}>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {children}
            </div>
          </div>
        )}
      </>
    )
  }
  
 
export const DropdownMenuItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button
    type="button"
    className="block w-full text-left px-4 py-2 text-sm text-gray-300  hover:text-white"
    role="menuitem"
    {...props}
  >
    {children}
  </button>
)