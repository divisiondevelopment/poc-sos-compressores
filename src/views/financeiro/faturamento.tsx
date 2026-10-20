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

type NotaFiscal = {
  id: string
  numero: string
  cliente: string
  valor: number
  emissao: string
  status: 'Emitida' | 'Cancelada'
}

const notasFiscaisData: NotaFiscal[] = [
  { id: '1', numero: 'NF-00512', cliente: 'Posto Estrela Azul', valor: 8450, emissao: '2026-09-27', status: 'Emitida' },
  { id: '2', numero: 'NF-00511', cliente: 'Frigorífico Vale Verde', valor: 15200, emissao: '2026-09-24', status: 'Emitida' },
  { id: '3', numero: 'NF-00510', cliente: 'Construtora Horizonte', valor: 4300, emissao: '2026-09-20', status: 'Cancelada' },
  { id: '4', numero: 'NF-00509', cliente: 'Transportadora Rota Sul', valor: 22750, emissao: '2026-09-14', status: 'Emitida' },
  { id: '5', numero: 'NF-00508', cliente: 'Indústria Metalcorte Ltda', valor: 9890, emissao: '2026-09-08', status: 'Emitida' }
]

const columns: ColumnDef<NotaFiscal>[] = [
  { accessorKey: 'numero', header: 'Número' },
  { accessorKey: 'cliente', header: 'Cliente' },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: ({ row }) => <span>{formatCurrencyBRL(row.original.valor)}</span>
  },
  {
    accessorKey: 'emissao',
    header: 'Emissão',
    cell: ({ row }) => <span>{format(new Date(row.original.emissao), 'dd MMM yyyy', { locale: ptBR })}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<NotaFiscal>()
]

const Faturamento = () => (
  <SimpleListView
    title='Faturamento'
    description='Emissão de notas fiscais e acompanhamento do faturamento da empresa.'
    searchPlaceholder='Buscar nota fiscal'
    actionLabel='Emitir Nota Fiscal'
    columns={columns}
    data={notasFiscaisData}
  />
)

export default Faturamento
