// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Login from '@/views/pages/auth/login'

export const Route = createFileRoute('/_blank/pages/auth/login')({
  component: Login
})
