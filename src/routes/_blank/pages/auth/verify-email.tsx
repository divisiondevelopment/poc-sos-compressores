// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import VerifyEmail from '@/views/pages/auth/verify-email'

export const Route = createFileRoute('/_blank/pages/auth/verify-email')({
  component: VerifyEmail
})
