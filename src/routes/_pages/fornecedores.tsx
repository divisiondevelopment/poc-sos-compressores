// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Fornecedores from '@/views/fornecedores'

export const Route = createFileRoute('/_pages/fornecedores')({
  component: Fornecedores
})
