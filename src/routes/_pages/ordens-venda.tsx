// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import OrdensVenda from '@/views/operacional/ordens-venda'

export const Route = createFileRoute('/_pages/ordens-venda')({
  component: OrdensVenda
})
