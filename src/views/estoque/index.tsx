// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type ItemEstoque = {
  id: string
  codigo: string
  nome: string
  categoria: string
  quantidade: number
  status: 'Em estoque' | 'Estoque baixo' | 'Sem estoque'
}

const itensData: ItemEstoque[] = [
  { id: '1', codigo: 'PC-1001', nome: 'Compressor Parafuso 50HP', categoria: 'Equipamentos', quantidade: 4, status: 'Em estoque' },
  { id: '2', codigo: 'PC-1002', nome: 'Filtro de Ar FA-220', categoria: 'Filtros', quantidade: 2, status: 'Estoque baixo' },
  { id: '3', codigo: 'PC-1003', nome: 'Óleo Lubrificante Sintético 5L', categoria: 'Lubrificantes', quantidade: 18, status: 'Em estoque' },
  { id: '4', codigo: 'PC-1004', nome: 'Correia Industrial B-52', categoria: 'Correias', quantidade: 0, status: 'Sem estoque' },
  { id: '5', codigo: 'PC-1005', nome: 'Válvula de Segurança 1/2"', categoria: 'Peças', quantidade: 9, status: 'Em estoque' },
  { id: '6', codigo: 'PC-1006', nome: 'Kit Reparo Compressor Pistão', categoria: 'Peças', quantidade: 3, status: 'Estoque baixo' }
]

const columns: ColumnDef<ItemEstoque>[] = [
  { accessorKey: 'codigo', header: 'Código' },
  { accessorKey: 'nome', header: 'Item' },
  { accessorKey: 'categoria', header: 'Categoria' },
  { accessorKey: 'quantidade', header: 'Quantidade' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<ItemEstoque>()
]

const EstoqueItens = () => (
  <SimpleListView
    title='Itens'
    description='Consulta e gestão dos itens de estoque: peças, insumos e equipamentos.'
    searchPlaceholder='Buscar item'
    actionLabel='Novo Item'
    columns={columns}
    data={itensData}
  />
)

export default EstoqueItens
