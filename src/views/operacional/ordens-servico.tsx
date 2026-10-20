// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Component Imports
import { createListActionsColumn } from '@/components/shared/ListRowActions'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

type OrdemServico = {
  id: string
  codigo: string
  cliente: string
  equipamento: string
  data: string
  status: 'Aberta' | 'Em andamento' | 'Concluída' | 'Cancelada'
}

const ordensServicoData: OrdemServico[] = [
  {
    id: '1',
    codigo: 'OS-1042',
    cliente: 'Metalúrgica Reis',
    equipamento: 'Compressor Parafuso 50HP',
    data: '2026-09-28',
    status: 'Em andamento'
  },
  {
    id: '2',
    codigo: 'OS-1041',
    cliente: 'Frigorífico Vale Verde',
    equipamento: 'Compressor Pistão 10HP',
    data: '2026-09-25',
    status: 'Concluída'
  },
  {
    id: '3',
    codigo: 'OS-1040',
    cliente: 'Posto Estrela Azul',
    equipamento: 'Compressor Parafuso 20HP',
    data: '2026-09-22',
    status: 'Aberta'
  },
  {
    id: '4',
    codigo: 'OS-1039',
    cliente: 'Transportadora Rota Sul',
    equipamento: 'Compressor Parafuso 75HP',
    data: '2026-09-18',
    status: 'Concluída'
  },
  {
    id: '5',
    codigo: 'OS-1038',
    cliente: 'Construtora Horizonte',
    equipamento: 'Compressor Pistão 15HP',
    data: '2026-09-15',
    status: 'Cancelada'
  },
  {
    id: '6',
    codigo: 'OS-1037',
    cliente: 'Indústria Metalcorte Ltda',
    equipamento: 'Compressor Parafuso 30HP',
    data: '2026-09-10',
    status: 'Concluída'
  }
]

const columns: ColumnDef<OrdemServico>[] = [
  { accessorKey: 'codigo', header: 'Código' },
  { accessorKey: 'cliente', header: 'Cliente' },
  { accessorKey: 'equipamento', header: 'Equipamento' },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => <span>{format(new Date(`${row.original.data}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{row.original.status}</StatusBadge>
  },
  createListActionsColumn<OrdemServico>()
]

const OrdensServico = () => (
  <SimpleListView
    title='Ordens de Serviço'
    description='Gestão das ordens de serviço de manutenção e reparo de compressores.'
    searchPlaceholder='Buscar ordem de serviço'
    actionLabel='Nova Ordem de Serviço'
    columns={columns}
    data={ordensServicoData}
  />
)

export default OrdensServico
