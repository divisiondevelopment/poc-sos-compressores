// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type Integracao = {
  id: string
  nome: string
  tipo: string
  status: 'Conectado' | 'Desconectado'
  ultimaSincronizacao: string
}

const integracoesData: Integracao[] = [
  { id: '1', nome: 'ERP Financeiro', tipo: 'Sistema de Gestão', status: 'Conectado', ultimaSincronizacao: '2026-09-28T08:00:00' },
  { id: '2', nome: 'Gateway de Pagamento', tipo: 'Pagamentos', status: 'Conectado', ultimaSincronizacao: '2026-09-28T07:30:00' },
  { id: '3', nome: 'Emissor de NF-e', tipo: 'Fiscal', status: 'Conectado', ultimaSincronizacao: '2026-09-27T22:10:00' },
  { id: '4', nome: 'WhatsApp Business API', tipo: 'Comunicação', status: 'Desconectado', ultimaSincronizacao: '2026-09-20T10:00:00' },
  { id: '5', nome: 'Rastreador de Frota', tipo: 'Logística', status: 'Conectado', ultimaSincronizacao: '2026-09-28T06:45:00' }
]

const columns: ColumnDef<Integracao>[] = [
  { accessorKey: 'nome', header: 'Integração' },
  { accessorKey: 'tipo', header: 'Tipo' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  {
    accessorKey: 'ultimaSincronizacao',
    header: 'Última Sincronização',
    cell: ({ row }) => <span>{format(new Date(row.original.ultimaSincronizacao), 'dd MMM yyyy HH:mm', { locale: ptBR })}</span>
  },
  createListActionsColumn<Integracao>()
]

const Integracoes = () => (
  <SimpleListView
    title='Integrações'
    description='Configuração de integrações do sistema com serviços externos.'
    searchPlaceholder='Buscar integração'
    actionLabel='Nova Integração'
    columns={columns}
    data={integracoesData}
  />
)

export default Integracoes
