// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import UserSetting from '@/views/pages/user-settings'

type SearchParams = {
  setting?: string
}

export const Route = createFileRoute('/_pages/pages/user-settings')({
  // The active tab is read and written by nuqs; this only types the param for <Link search>
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    setting: typeof search.setting === 'string' ? search.setting : undefined
  }),
  component: UserSetting
})
