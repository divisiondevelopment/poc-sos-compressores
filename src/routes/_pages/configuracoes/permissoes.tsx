// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Permissoes from '@/views/configuracoes/permissoes'

export const Route = createFileRoute('/_pages/configuracoes/permissoes')({
  component: Permissoes
})
