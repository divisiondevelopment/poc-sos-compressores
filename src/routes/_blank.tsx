// Third-party Imports
import { createFileRoute, Outlet } from '@tanstack/react-router'

// Component Imports
import BlankLayout from '@/components/layout/BlankLayout'

// Layout without the app shell, used by auth and error pages (formerly the `(blank)` route group)
const PublicLayout = () => {
  return (
    <BlankLayout>
      <Outlet />
    </BlankLayout>
  )
}

export const Route = createFileRoute('/_blank')({
  component: PublicLayout
})
