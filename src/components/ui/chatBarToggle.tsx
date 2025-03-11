import { Menu } from 'lucide-react'
import { Button } from './button'


interface SidebarToggleProps {
  onClick: () => void
}

export function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
     
      className="lg:hidden"
      onClick={onClick}
      aria-label="Toggle sidebar"
    >
      <Menu className="h-6 w-6" />
    </Button>
  )
}

