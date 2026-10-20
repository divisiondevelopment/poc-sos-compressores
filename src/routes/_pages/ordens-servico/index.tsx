// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import OrdensServico from '@/views/operacional/ordens-servico'

export const Route = createFileRoute('/_pages/ordens-servico/')({
  component: OrdensServico
})
