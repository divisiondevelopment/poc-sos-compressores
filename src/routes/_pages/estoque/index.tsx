// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import EstoqueItens from '@/views/estoque'

export const Route = createFileRoute('/_pages/estoque/')({
  component: EstoqueItens
})
