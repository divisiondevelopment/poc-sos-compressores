// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type Funcionario = {
  id: string
  nome: string
  cargo: string
  setor: string
  admissao: string
  status: 'Ativo' | 'Inativo'
}

const funcionariosData: Funcionario[] = [
  {
    id: '1',
    nome: 'Carlos Eduardo Santos',
    cargo: 'Técnico de Manutenção',
    setor: 'Operacional',
    admissao: '2021-03-15',
    status: 'Ativo'
  },
  {
    id: '2',
    nome: 'Marina Oliveira Costa',
    cargo: 'Analista Financeiro',
    setor: 'Financeiro',
    admissao: '2020-07-01',
    status: 'Ativo'
  },
  { id: '3', nome: 'Roberto Almeida', cargo: 'Vendedor', setor: 'Comercial', admissao: '2022-01-10', status: 'Ativo' },
  { id: '4', nome: 'Fernanda Lima', cargo: 'Almoxarife', setor: 'Estoque', admissao: '2019-11-20', status: 'Ativo' },
  {
    id: '5',
    nome: 'Paulo Henrique Souza',
    cargo: 'Técnico de Manutenção',
    setor: 'Operacional',
    admissao: '2023-05-02',
    status: 'Inativo'
  },
  {
    id: '6',
    nome: 'Juliana Ribeiro',
    cargo: 'Assistente Administrativo',
    setor: 'Administrativo',
    admissao: '2022-09-12',
    status: 'Ativo'
  }
]

const columns: ColumnDef<Funcionario>[] = [
  {
    accessorKey: 'nome',
    header: 'Funcionário',
    cell: ({ row }) => (
      <div className='flex flex-col text-sm'>
        <span className='font-medium'>{row.original.nome}</span>
        <span className='text-muted-foreground'>{row.original.cargo}</span>
      </div>
    )
  },
  { accessorKey: 'setor', header: 'Setor' },
  {
    accessorKey: 'admissao',
    header: 'Admissão',
    cell: ({ row }) => (
      <span>{format(new Date(`${row.original.admissao}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })}</span>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<Funcionario>()
]

const Funcionarios = () => (
  <SimpleListView
    title='Funcionários'
    description='Cadastro e consulta dos funcionários da empresa.'
    searchPlaceholder='Buscar funcionário'
    actionLabel='Novo Funcionário'
    columns={columns}
    data={funcionariosData}
  />
)

export default Funcionarios
