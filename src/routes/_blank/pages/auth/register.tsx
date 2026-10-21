// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Register from '@/views/pages/auth/register'

export const Route = createFileRoute('/_blank/pages/auth/register')({
  component: Register
})
