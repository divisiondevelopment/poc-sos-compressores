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

type Boleto = {
  id: string
  documento: string
  destinatario: string
  valor: number
  vencimento: string
  status: 'Pago' | 'Pendente' | 'Vencido'
}

const boletosData: Boleto[] = [
  { id: '1', documento: 'BL-7001', destinatario: 'Posto Estrela Azul', valor: 8450, vencimento: '2026-10-05', status: 'Pendente' },
  { id: '2', documento: 'BL-7000', destinatario: 'Compressores Brasil Peças Ltda', valor: 12300, vencimento: '2026-09-30', status: 'Pago' },
  { id: '3', documento: 'BL-6999', destinatario: 'Frigorífico Vale Verde', valor: 15200, vencimento: '2026-09-25', status: 'Vencido' },
  { id: '4', documento: 'BL-6998', destinatario: 'Lubrificantes Industriais SA', valor: 3200, vencimento: '2026-09-20', status: 'Pago' },
  { id: '5', documento: 'BL-6997', destinatario: 'Transportadora Rota Sul', valor: 22750, vencimento: '2026-10-10', status: 'Pendente' }
]

const columns: ColumnDef<Boleto>[] = [
  { accessorKey: 'documento', header: 'Documento' },
  { accessorKey: 'destinatario', header: 'Destinatário' },
  {
    accessorKey: 'valor',
    header: 'Valor',
    cell: ({ row }) => <span>{formatCurrencyBRL(row.original.valor)}</span>
  },
  {
    accessorKey: 'vencimento',
    header: 'Vencimento',
    cell: ({ row }) => <span>{format(new Date(row.original.vencimento), 'dd MMM yyyy', { locale: ptBR })}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<Boleto>()
]

const BoletosPagamentos = () => (
  <SimpleListView
    title='Boletos e Pagamentos'
    description='Emissão e acompanhamento de boletos e pagamentos a clientes e fornecedores.'
    searchPlaceholder='Buscar boleto'
    actionLabel='Novo Boleto'
    columns={columns}
    data={boletosData}
  />
)

export default BoletosPagamentos
