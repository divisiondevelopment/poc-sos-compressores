// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Logs from '@/views/configuracoes/logs'

export const Route = createFileRoute('/_pages/configuracoes/logs')({
  component: Logs
})
