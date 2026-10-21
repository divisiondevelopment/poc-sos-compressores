// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import UserListApp from '@/views/apps/users/list'

export const Route = createFileRoute('/_pages/apps/users/list')({
  component: UserListApp
})
