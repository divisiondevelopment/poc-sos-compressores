// Third-party Imports
import { createFileRoute } from '@tanstack/react-router'

// Component Imports
import DataTable from '@/views/datatables'

export const Route = createFileRoute('/_pages/datatable')({
  component: DataTable
})
