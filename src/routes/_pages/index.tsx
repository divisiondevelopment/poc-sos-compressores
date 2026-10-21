// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import DashboardHome from '@/views/dashboards/home'

export const Route = createFileRoute('/_pages/')({
  component: DashboardHome
})
