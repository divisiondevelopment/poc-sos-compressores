// Type Imports
import type { ReactNode } from 'react'

// Component Imports
import { Badge } from '@/components/ui/badge'

export function StatusBadge({ children }: { children: ReactNode }) {
  return <Badge className='bg-primary/10 text-primary h-auto rounded-sm px-1.5 capitalize'>{children}</Badge>
}
