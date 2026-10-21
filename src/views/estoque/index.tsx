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
import { ItemEstoqueFormDialog } from '@/views/estoque/item-estoque-form-dialog'

// Data Imports
import { getStatusEstoque, itensEstoqueData, type ItemEstoque } from '@/fake-db/estoque/itens'

// Util Imports
import { cn, formatCurrencyBRL } from '@/lib/utils'

const getColumns = (onOpen: (item: ItemEstoque) => void): ColumnDef<ItemEstoque>[] => [
  { accessorKey: 'codigo', header: 'Código' },
  {
    accessorKey: 'nome',
    header: 'Item',
    cell: ({ row }) => (
      <div className='flex flex-col text-sm'>
        <span className='font-medium'>{row.original.nome}</span>
        <span className='text-muted-foreground'>{row.original.categoria}</span>
      </div>
    )
  },
  { accessorKey: 'tipo', header: 'Tipo' },
  {
    accessorKey: 'quantidade',
    header: 'Quantidade',
    cell: ({ row }) => {
      const { quantidade, estoqueMinimo, estoqueMaximo, unidade } = row.original
      const status = getStatusEstoque(row.original)
      const nivel = estoqueMaximo > 0 ? Math.min((quantidade / estoqueMaximo) * 100, 100) : 0

      return (
        <div className='flex min-w-28 flex-col gap-1.5'>
          <span className='text-sm font-medium'>
            {quantidade} {unidade}
          </span>
          <div className='bg-muted h-1.5 overflow-hidden rounded-full'>
            <div
              className={cn(
                'h-full rounded-full',
                status === 'Em estoque' ? 'bg-primary' : status === 'Estoque baixo' ? 'bg-amber-500' : 'bg-destructive'
              )}
              style={{ width: `${nivel}%` }}
            />
          </div>
          <span className='text-muted-foreground text-xs'>mín. {estoqueMinimo}</span>
        </div>
      )
    }
  },
  {
    accessorKey: 'precoMedio',
    header: 'Preço médio',
    cell: ({ row }) => <span className='whitespace-nowrap'>{formatCurrencyBRL(row.original.precoMedio)}</span>
  },
  {
    id: 'valorEstoque',
    header: 'Valor em estoque',
    cell: ({ row }) => (
      <span className='whitespace-nowrap'>{formatCurrencyBRL(row.original.quantidade * row.original.precoMedio)}</span>
    )
  },
  { accessorKey: 'localizacao', header: 'Localização' },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => <StatusBadge>{getStatusEstoque(row.original)}</StatusBadge>
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
            <DropdownMenuItem onClick={() => onOpen(row.original)}>
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen(row.original)}>
              <span>Ajustar estoque</span>
            </DropdownMenuItem>
            <DropdownMenuItem variant='destructive' onClick={() => toast.success(`Item ${row.original.nome} excluído`)}>
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

const EstoqueItens = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ItemEstoque | undefined>()
  const [, setVersion] = useState(0)

  const openDialog = (item?: ItemEstoque) => {
    setEditing(item)
    setDialogOpen(true)
  }

  return (
    <>
      <SimpleListView
        title='Itens'
        description='Consulta e gestão dos itens de estoque: peças, insumos e equipamentos.'
        searchPlaceholder='Buscar item'
        actionLabel='Novo Item'
        columns={getColumns(openDialog)}
        data={[...itensEstoqueData]}
        onRowClick={openDialog}
        onActionClick={() => openDialog()}
      />
      <ItemEstoqueFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editing}
        onSaved={() => setVersion(v => v + 1)}
      />
    </>
  )
}

export default EstoqueItens
