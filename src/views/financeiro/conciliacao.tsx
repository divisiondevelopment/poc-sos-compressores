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

type LancamentoBancario = {
  id: string
  data: string
  descricao: string
  valor: number
  status: 'Conciliado' | 'Pendente'
}

const lancamentosData: LancamentoBancario[] = [
  { id: '1', data: '2026-09-28', descricao: 'Recebimento NF-00512 - Posto Estrela Azul', valor: 8450, status: 'Conciliado' },
  { id: '2', data: '2026-09-27', descricao: 'Pagamento BL-6999 - Frigorífico Vale Verde', valor: -15200, status: 'Pendente' },
  { id: '3', data: '2026-09-26', descricao: 'Tarifa bancária', valor: -45.9, status: 'Conciliado' },
  { id: '4', data: '2026-09-25', descricao: 'Recebimento NF-00509 - Transportadora Rota Sul', valor: 22750, status: 'Pendente' },
  { id: '5', data: '2026-09-24', descricao: 'Pagamento fornecedor OC-3050', valor: -3200, status: 'Conciliado' }
]

const columns: ColumnDef<LancamentoBancario>[] = [
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => <span>{format(new Date(row.original.data), 'dd MMM yyyy', { locale: ptBR })}</span>
  },
  { accessorKey: 'descricao', header: 'Descrição' },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: ({ row }) => <span>{formatCurrencyBRL(row.original.valor)}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<LancamentoBancario>()
]

const ConciliacaoBancaria = () => (
  <SimpleListView
    title='Conciliação Bancária'
    description='Conciliação dos lançamentos bancários com o financeiro da empresa.'
    searchPlaceholder='Buscar lançamento'
    actionLabel='Novo Lançamento'
    columns={columns}
    data={lancamentosData}
  />
)

export default ConciliacaoBancaria
