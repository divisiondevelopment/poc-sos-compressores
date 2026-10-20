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

type OrdemCompra = {
  id: string
  codigo: string
  fornecedor: string
  valor: number
  data: string
  status: 'Aberta' | 'Recebida' | 'Cancelada'
}

const ordensCompraData: OrdemCompra[] = [
  {
    id: '1',
    codigo: 'OC-3051',
    fornecedor: 'Compressores Brasil Peças Ltda',
    valor: 12300,
    data: '2026-09-26',
    status: 'Recebida'
  },
  {
    id: '2',
    codigo: 'OC-3050',
    fornecedor: 'Lubrificantes Industriais SA',
    valor: 3200,
    data: '2026-09-23',
    status: 'Recebida'
  },
  {
    id: '3',
    codigo: 'OC-3049',
    fornecedor: 'Correias e Filtros Ltda',
    valor: 1850,
    data: '2026-09-19',
    status: 'Aberta'
  },
  { id: '4', codigo: 'OC-3048', fornecedor: 'Metalúrgica Reis', valor: 7600, data: '2026-09-12', status: 'Cancelada' },
  {
    id: '5',
    codigo: 'OC-3047',
    fornecedor: 'Distribuidora Ar Comprimido',
    valor: 5400,
    data: '2026-09-05',
    status: 'Recebida'
  }
]

const columns: ColumnDef<OrdemCompra>[] = [
  { accessorKey: 'codigo', header: 'Código' },
  { accessorKey: 'fornecedor', header: 'Fornecedor' },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: ({ row }) => <span>{formatCurrencyBRL(row.original.valor)}</span>
  },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => <span>{format(new Date(`${row.original.data}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<OrdemCompra>()
]

const OrdensCompra = () => (
  <SimpleListView
    title='Ordens de Compra'
    description='Gestão das ordens de compra de peças e insumos junto a fornecedores.'
    searchPlaceholder='Buscar ordem de compra'
    actionLabel='Nova Ordem de Compra'
    columns={columns}
    data={ordensCompraData}
  />
)

export default OrdensCompra
