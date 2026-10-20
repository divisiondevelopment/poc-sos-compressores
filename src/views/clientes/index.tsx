// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type Cliente = {
  id: string
  nome: string
  documento: string
  cidade: string
  telefone: string
  status: 'Ativo' | 'Inativo'
}

const clientesData: Cliente[] = [
  {
    id: '1',
    nome: 'João Pereira',
    documento: '123.456.789-00',
    cidade: 'São Paulo - SP',
    telefone: '(11) 98765-4321',
    status: 'Ativo'
  },
  {
    id: '2',
    nome: 'Indústria Metalcorte Ltda',
    documento: '98.765.432/0001-21',
    cidade: 'Campinas - SP',
    telefone: '(19) 3251-7788',
    status: 'Ativo'
  },
  {
    id: '3',
    nome: 'Transportadora Rota Sul',
    documento: '11.222.333/0001-44',
    cidade: 'Curitiba - PR',
    telefone: '(41) 99887-1122',
    status: 'Ativo'
  },
  {
    id: '4',
    nome: 'Frigorífico Vale Verde',
    documento: '22.333.444/0001-55',
    cidade: 'Uberlândia - MG',
    telefone: '(34) 3215-6677',
    status: 'Inativo'
  },
  {
    id: '5',
    nome: 'Posto Estrela Azul',
    documento: '33.444.555/0001-66',
    cidade: 'Ribeirão Preto - SP',
    telefone: '(16) 3622-4455',
    status: 'Ativo'
  },
  {
    id: '6',
    nome: 'Construtora Horizonte',
    documento: '44.555.666/0001-77',
    cidade: 'Belo Horizonte - MG',
    telefone: '(31) 3344-5566',
    status: 'Inativo'
  }
]

const columns: ColumnDef<Cliente>[] = [
  {
    accessorKey: 'nome',
    header: 'Cliente',
    cell: ({ row }) => (
      <div className='flex flex-col text-sm'>
        <span className='font-medium'>{row.original.nome}</span>
        <span className='text-muted-foreground'>{row.original.documento}</span>
      </div>
    )
  },
  { accessorKey: 'cidade', header: 'Cidade' },
  { accessorKey: 'telefone', header: 'Telefone' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<Cliente>()
]

const Clientes = () => (
  <SimpleListView
    title='Clientes'
    description='Cadastro e consulta dos clientes da SOS Compressores.'
    searchPlaceholder='Buscar cliente'
    actionLabel='Novo Cliente'
    columns={columns}
    data={clientesData}
  />
)

export default Clientes
