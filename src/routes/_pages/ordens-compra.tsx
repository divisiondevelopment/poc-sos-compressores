// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import OrdensCompra from '@/views/operacional/ordens-compra'

export const Route = createFileRoute('/_pages/ordens-compra')({
  component: OrdensCompra
})
