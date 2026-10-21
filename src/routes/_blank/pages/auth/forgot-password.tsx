// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import ForgotPassword from '@/views/pages/auth/forgot-password'

export const Route = createFileRoute('/_blank/pages/auth/forgot-password')({
  component: ForgotPassword
})
