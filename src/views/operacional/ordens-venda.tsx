// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

// Util Imports
import { formatCurrencyBRL } from '@/lib/utils'

type OrdemVenda = {
  id: string
  codigo: string
  cliente: string
  valor: number
  data: string
  status: 'Aberta' | 'Faturada' | 'Cancelada'
}

const ordensVendaData: OrdemVenda[] = [
  { id: '1', codigo: 'OV-2041', cliente: 'Posto Estrela Azul', valor: 8450, data: '2026-09-27', status: 'Faturada' },
  { id: '2', codigo: 'OV-2040', cliente: 'Frigorífico Vale Verde', valor: 15200, data: '2026-09-24', status: 'Aberta' },
  { id: '3', codigo: 'OV-2039', cliente: 'Construtora Horizonte', valor: 4300, data: '2026-09-20', status: 'Faturada' },
  { id: '4', codigo: 'OV-2038', cliente: 'Transportadora Rota Sul', valor: 22750, data: '2026-09-14', status: 'Cancelada' },
  { id: '5', codigo: 'OV-2037', cliente: 'Indústria Metalcorte Ltda', valor: 9890, data: '2026-09-08', status: 'Faturada' }
]

const columns: ColumnDef<OrdemVenda>[] = [
  { accessorKey: 'codigo', header: 'Código' },
  { accessorKey: 'cliente', header: 'Cliente' },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: ({ row }) => <span>{formatCurrencyBRL(row.original.valor)}</span>
  },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => <span>{format(new Date(row.original.data), 'dd MMM yyyy', { locale: ptBR })}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<OrdemVenda>()
]

const OrdensVenda = () => (
  <SimpleListView
    title='Ordens de Venda'
    description='Gestão das ordens de venda de peças, serviços e equipamentos.'
    searchPlaceholder='Buscar ordem de venda'
    actionLabel='Nova Ordem de Venda'
    columns={columns}
    data={ordensVendaData}
  />
)

export default OrdensVenda
