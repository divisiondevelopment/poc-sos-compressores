'use client'

// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'
import { Link, useNavigate } from '@tanstack/react-router'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { EllipsisVerticalIcon, EyeIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'

// Data Imports
import { ordensServicoData, type OrdemServico } from '@/fake-db/operacional/ordens-servico'

function OrdemServicoRowActions({ ordem }: { ordem: OrdemServico }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size='icon' variant='ghost' aria-label='Abrir ações' />}>
        <EllipsisVerticalIcon className='size-5' aria-hidden='true' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link to='/ordens-servico/$id' params={{ id: ordem.id }} />}>
            <EyeIcon className='size-4' />
            <span>Visualizar</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => toast.success(`Ordem de serviço ${ordem.codigo} atualizada com sucesso`)}>
            <span>Editar</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.success(`Status da ordem ${ordem.codigo} atualizado`)}>
            <span>Mudar Status</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant='destructive'
            onClick={() => toast.success(`Ordem de serviço ${ordem.codigo} excluída com sucesso`)}
          >
            <span>Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
  {
    id: 'actions',
    header: () => 'Ações',
    cell: ({ row }) => <OrdemServicoRowActions ordem={row.original} />,
    size: 60,
    enableHiding: false
  }
]

const OrdensServico = () => {
  const navigate = useNavigate()

  return (
    <SimpleListView
      title='Ordens de Serviço'
      description='Gestão das ordens de serviço de manutenção e reparo de compressores.'
      searchPlaceholder='Buscar ordem de serviço'
      actionLabel='Nova Ordem de Serviço'
      columns={columns}
      data={ordensServicoData}
      onRowClick={ordem => navigate({ to: '/ordens-servico/$id', params: { id: ordem.id } })}
      onActionClick={() => toast.success('Ordem de serviço criada com sucesso')}
    />
  )
}

export default OrdensServico
