// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import { EventCalendar } from '@/views/apps/calendar'

export const Route = createFileRoute('/_pages/apps/calendar')({
  component: EventCalendar
})
