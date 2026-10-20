// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'

type LogEvento = {
  id: string
  dataHora: string
  usuario: string
  acao: string
  modulo: string
}

const logsData: LogEvento[] = [
  {
    id: '1',
    dataHora: '2026-09-28T14:32:00',
    usuario: 'Carlos Eduardo Santos',
    acao: 'Atualizou ordem de serviço OS-1042',
    modulo: 'Operacional'
  },
  {
    id: '2',
    dataHora: '2026-09-28T11:05:00',
    usuario: 'Marina Oliveira Costa',
    acao: 'Emitiu nota fiscal NF-00512',
    modulo: 'Financeiro'
  },
  {
    id: '3',
    dataHora: '2026-09-27T17:40:00',
    usuario: 'Fernanda Lima',
    acao: 'Registrou ajuste de estoque',
    modulo: 'Estoque'
  },
  {
    id: '4',
    dataHora: '2026-09-27T09:15:00',
    usuario: 'Roberto Almeida',
    acao: 'Criou cliente Posto Estrela Azul',
    modulo: 'Cadastros'
  },
  {
    id: '5',
    dataHora: '2026-09-26T16:02:00',
    usuario: 'Juliana Ribeiro',
    acao: 'Alterou permissões de usuário',
    modulo: 'Configurações'
  }
]

const columns: ColumnDef<LogEvento>[] = [
  {
    accessorKey: 'dataHora',
    header: 'Data/Hora',
    cell: ({ row }) => <span>{format(new Date(row.original.dataHora), 'dd MMM yyyy HH:mm', { locale: ptBR })}</span>
  },
  { accessorKey: 'usuario', header: 'Usuário' },
  { accessorKey: 'acao', header: 'Ação' },
  { accessorKey: 'modulo', header: 'Módulo' },
  createListActionsColumn<LogEvento>()
]

const Logs = () => (
  <SimpleListView
    title='Logs'
    description='Histórico de eventos e logs de auditoria do sistema.'
    searchPlaceholder='Buscar log'
    actionLabel='Novo Registro'
    columns={columns}
    data={logsData}
  />
)

export default Logs
