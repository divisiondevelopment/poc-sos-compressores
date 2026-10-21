// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import ErrorPage from '@/views/pages/misc/error-page'

export const Route = createFileRoute('/_blank/pages/misc/error-page')({
  component: ErrorPage
})
