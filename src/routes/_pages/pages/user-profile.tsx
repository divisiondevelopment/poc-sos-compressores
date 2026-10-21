// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import UserProfile from '@/views/pages/user-profile'

type SearchParams = {
  view?: string
}

export const Route = createFileRoute('/_pages/pages/user-profile')({
  // The active tab is read and written by nuqs; this only types the param for <Link search>
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    view: typeof search.view === 'string' ? search.view : undefined
  }),
  component: UserProfile
})
