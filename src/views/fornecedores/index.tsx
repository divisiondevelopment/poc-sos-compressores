// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type Fornecedor = {
  id: string
  nome: string
  cnpj: string
  categoria: string
  contato: string
  status: 'Ativo' | 'Inativo'
}

const fornecedoresData: Fornecedor[] = [
  {
    id: '1',
    nome: 'Compressores Brasil Peças Ltda',
    cnpj: '10.203.040/0001-11',
    categoria: 'Peças e componentes',
    contato: 'contato@compressoresbrasil.com.br',
    status: 'Ativo'
  },
  {
    id: '2',
    nome: 'Lubrificantes Industriais SA',
    cnpj: '20.304.050/0001-22',
    categoria: 'Lubrificantes',
    contato: 'vendas@lubrindustrial.com.br',
    status: 'Ativo'
  },
  {
    id: '3',
    nome: 'Metalúrgica Reis',
    cnpj: '30.405.060/0001-33',
    categoria: 'Usinagem',
    contato: 'financeiro@metalurgicareis.com.br',
    status: 'Ativo'
  },
  {
    id: '4',
    nome: 'Distribuidora Ar Comprimido',
    cnpj: '40.506.070/0001-44',
    categoria: 'Equipamentos',
    contato: 'comercial@distribuidorar.com.br',
    status: 'Inativo'
  },
  {
    id: '5',
    nome: 'Correias e Filtros Ltda',
    cnpj: '50.607.080/0001-55',
    categoria: 'Filtros e correias',
    contato: 'atendimento@correiasefiltros.com.br',
    status: 'Ativo'
  }
]

const columns: ColumnDef<Fornecedor>[] = [
  {
    accessorKey: 'nome',
    header: 'Fornecedor',
    cell: ({ row }) => (
      <div className='flex flex-col text-sm'>
        <span className='font-medium'>{row.original.nome}</span>
        <span className='text-muted-foreground'>{row.original.cnpj}</span>
      </div>
    )
  },
  { accessorKey: 'categoria', header: 'Categoria' },
  { accessorKey: 'contato', header: 'Contato' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<Fornecedor>()
]

const Fornecedores = () => (
  <SimpleListView
    title='Fornecedores'
    description='Cadastro e consulta dos fornecedores de peças e serviços.'
    searchPlaceholder='Buscar fornecedor'
    actionLabel='Novo Fornecedor'
    columns={columns}
    data={fornecedoresData}
  />
)

export default Fornecedores
