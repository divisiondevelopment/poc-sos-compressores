// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import EstoqueAjustes from '@/views/estoque/ajustes'

export const Route = createFileRoute('/_pages/estoque/ajustes')({
  component: EstoqueAjustes
})
