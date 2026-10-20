// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type AjusteEstoque = {
  id: string
  data: string
  item: string
  tipo: 'Entrada' | 'Saída' | 'Correção'
  quantidade: number
  responsavel: string
}

const ajustesData: AjusteEstoque[] = [
  {
    id: '1',
    data: '2026-09-28',
    item: 'Compressor Parafuso 50HP',
    tipo: 'Entrada',
    quantidade: 2,
    responsavel: 'Carlos Eduardo Santos'
  },
  {
    id: '2',
    data: '2026-09-27',
    item: 'Filtro de Ar FA-220',
    tipo: 'Saída',
    quantidade: 5,
    responsavel: 'Fernanda Lima'
  },
  {
    id: '3',
    data: '2026-09-26',
    item: 'Correia Industrial B-52',
    tipo: 'Saída',
    quantidade: 3,
    responsavel: 'Fernanda Lima'
  },
  {
    id: '4',
    data: '2026-09-25',
    item: 'Óleo Lubrificante Sintético 5L',
    tipo: 'Entrada',
    quantidade: 10,
    responsavel: 'Fernanda Lima'
  },
  {
    id: '5',
    data: '2026-09-24',
    item: 'Kit Reparo Compressor Pistão',
    tipo: 'Correção',
    quantidade: 1,
    responsavel: 'Carlos Eduardo Santos'
  }
]

const columns: ColumnDef<AjusteEstoque>[] = [
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => <span>{format(new Date(`${row.original.data}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })}</span>
  },
  { accessorKey: 'item', header: 'Item' },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    cell: ({ row }) => <StatusBadge>{row.original.tipo}</StatusBadge>
  },
  { accessorKey: 'quantidade', header: 'Quantidade' },
  { accessorKey: 'responsavel', header: 'Responsável' },
  createListActionsColumn<AjusteEstoque>()
]

const EstoqueAjustes = () => (
  <SimpleListView
    title='Ajustes de Estoque'
    description='Lançamentos de entrada, saída e correção manual de quantidades em estoque.'
    searchPlaceholder='Buscar ajuste'
    actionLabel='Novo Ajuste'
    columns={columns}
    data={ajustesData}
  />
)

export default EstoqueAjustes
