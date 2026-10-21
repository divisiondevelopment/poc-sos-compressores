// Third-party Imports
import { createFileRoute, redirect } from '@tanstack/react-router'

// `/apps/users` → `/apps/users/list`
export const Route = createFileRoute('/_pages/apps/users/')({
  beforeLoad: () => {
    throw redirect({ to: '/apps/users/list', replace: true })
  }
})
