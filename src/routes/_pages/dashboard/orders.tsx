// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import OrdersDashboard from '@/views/dashboards/orders'

export const Route = createFileRoute('/_pages/dashboard/orders')({
  component: OrdersDashboard
})
