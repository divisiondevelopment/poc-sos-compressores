// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Faturamento from '@/views/financeiro/faturamento'

export const Route = createFileRoute('/_pages/financeiro/faturamento')({
  component: Faturamento
})
