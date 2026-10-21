// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import BoletosPagamentos from '@/views/financeiro/boletos'

export const Route = createFileRoute('/_pages/financeiro/boletos')({
  component: BoletosPagamentos
})
