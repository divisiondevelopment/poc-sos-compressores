'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { EllipsisVerticalIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { SimpleListView } from '@/components/shared/SimpleListView'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ClienteFormDialog } from '@/views/clientes/cliente-form-dialog'

// Data Imports
import { clientesData, type Cliente } from '@/fake-db/cadastros/clientes'

const getColumns = (onEdit: (cliente: Cliente) => void): ColumnDef<Cliente>[] => [
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
  {
    id: 'actions',
    header: () => 'Ações',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size='icon' variant='ghost' aria-label='Abrir ações' />}>
          <EllipsisVerticalIcon className='size-5' aria-hidden='true' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant='destructive'
              onClick={() => toast.success(`Cliente ${row.original.nome} excluído`)}
            >
              <span>Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 60,
    enableHiding: false
  }
]

const Clientes = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Cliente | undefined>()
  const [, setVersion] = useState(0)

  const openDialog = (cliente?: Cliente) => {
    setEditing(cliente)
    setDialogOpen(true)
  }

  return (
    <>
      <SimpleListView
        title='Clientes'
        description='Cadastro e consulta dos clientes da SOS Compressores.'
        searchPlaceholder='Buscar cliente'
        actionLabel='Novo Cliente'
        columns={getColumns(openDialog)}
        data={[...clientesData]}
        onRowClick={openDialog}
        onActionClick={() => openDialog()}
      />
      <ClienteFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        cliente={editing}
        onSaved={() => setVersion(v => v + 1)}
      />
    </>
  )
}

export default Clientes
