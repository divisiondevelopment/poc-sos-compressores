// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import Funcionarios from '@/views/funcionarios'

export const Route = createFileRoute('/_pages/funcionarios')({
  component: Funcionarios
})
