// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import ConciliacaoBancaria from '@/views/financeiro/conciliacao'

export const Route = createFileRoute('/_pages/financeiro/conciliacao')({
  component: ConciliacaoBancaria
})
