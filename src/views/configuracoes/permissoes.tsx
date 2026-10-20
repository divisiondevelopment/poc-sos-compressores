// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type Permissao = {
  id: string
  papel: string
  modulo: string
  nivel: 'Leitura' | 'Escrita' | 'Administrador'
}

const permissoesData: Permissao[] = [
  { id: '1', papel: 'Administrador', modulo: 'Todos os módulos', nivel: 'Administrador' },
  { id: '2', papel: 'Financeiro', modulo: 'Financeiro', nivel: 'Escrita' },
  { id: '3', papel: 'Operacional', modulo: 'Operacional', nivel: 'Escrita' },
  { id: '4', papel: 'Estoque', modulo: 'Estoque', nivel: 'Escrita' },
  { id: '5', papel: 'Comercial', modulo: 'Cadastros', nivel: 'Leitura' },
  { id: '6', papel: 'Auditoria', modulo: 'Logs', nivel: 'Leitura' }
]

const columns: ColumnDef<Permissao>[] = [
  { accessorKey: 'papel', header: 'Papel' },
  { accessorKey: 'modulo', header: 'Módulo' },
  {
    accessorKey: 'nivel',
    header: 'Nível',
    cell: ({ row }) => <StatusBadge>{row.original.nivel}</StatusBadge>
  },
  createListActionsColumn<Permissao>()
]

const Permissoes = () => (
  <SimpleListView
    title='Permissões'
    description='Gestão de papéis e permissões de acesso ao sistema.'
    searchPlaceholder='Buscar permissão'
    actionLabel='Nova Permissão'
    columns={columns}
    data={permissoesData}
  />
)

export default Permissoes
