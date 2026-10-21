// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Clientes from '@/views/clientes'

export const Route = createFileRoute('/_pages/clientes')({
  component: Clientes
})
