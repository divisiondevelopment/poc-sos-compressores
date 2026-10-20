// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import OrdemServicoDetail from '@/views/operacional/ordem-servico-detail'

export const Route = createFileRoute('/_pages/ordens-servico/$id')({
  component: OrdemServicoDetail
})
