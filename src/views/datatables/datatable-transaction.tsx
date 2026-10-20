'use client'

import { useState } from 'react'

import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { usePagination } from '@/hooks/use-pagination'

import { formatCurrencyBRL } from '@/lib/utils'

export type Item = {
  id: string
  avatar: string
  avatarFallback: string
  name: string
  email: string
  amount: number
  status: 'pending' | 'processing' | 'paid' | 'failed'
  paidBy: 'mastercard' | 'visa'
}

const STATUS_LABELS: Record<Item['status'], string> = {
  pending: 'Pendente',
  processing: 'Processando',
  paid: 'Pago',
  failed: 'Falhou'
}

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'name',
    header: 'Cliente',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar className='size-9'>
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback className='text-xs'>{row.original.avatarFallback}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm'>
          <span className='text-card-foreground font-medium'>{row.getValue('name')}</span>
          <span className='text-muted-foreground'>{row.original.email}</span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))

      return <span>{formatCurrencyBRL(amount)}</span>
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge className='bg-primary/10 text-primary h-auto rounded-sm px-1.5'>
        {STATUS_LABELS[row.getValue('status') as Item['status']]}
      </Badge>
    )
  },
  {
    accessorKey: 'paidBy',
    header: () => <span className='w-fit'>Pago com</span>,
    cell: ({ row }) => (
      <img
        src={
          row.getValue('paidBy') === 'mastercard' ? '/images/datatable/image-1.webp' : '/images/datatable/image-2.webp'
        }
        alt='Forma de pagamento'
        className='w-10.5'
      />
    )
  },
  {
    id: 'actions',
    header: () => 'Ações',
    cell: () => <RowActions />,
    size: 60,
    enableHiding: false
  }
]

const TransactionDatatable = ({ data }: { data: Item[] }) => {
  const pageSize = 5

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination
    }
  })

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: table.getState().pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: 2
  })

  return (
    <div className='w-full'>
      <div className='border-b'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='text-muted-foreground h-14 first:pl-4'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='first:pl-4'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between gap-3 px-6 py-4 max-sm:flex-col md:max-lg:flex-col'>
        <p className='text-muted-foreground text-sm whitespace-nowrap' aria-live='polite'>
          Exibindo <span>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</span> a{' '}
          <span>
            {Math.min(
              Math.max(
                table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                0
              ),
              table.getRowCount()
            )}
          </span>{' '}
          de <span>{table.getRowCount().toString()} itens</span>
        </p>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  className='disabled:pointer-events-none disabled:opacity-50'
                  variant='ghost'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label='Ir para a página anterior'
                >
                  <ChevronLeftIcon aria-hidden='true' />
                  Anterior
                </Button>
              </PaginationItem>

              {showLeftEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {pages.map(page => {
                const isActive = page === table.getState().pagination.pageIndex + 1

                return (
                  <PaginationItem key={page}>
                    <Button
                      size='icon'
                      className={`${!isActive && 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'}`}
                      onClick={() => table.setPageIndex(page - 1)}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                )
              })}

              {showRightEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <Button
                  className='disabled:pointer-events-none disabled:opacity-50'
                  variant='ghost'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label='Ir para a próxima página'
                >
                  Próxima
                  <ChevronRightIcon aria-hidden='true' />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default TransactionDatatable

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size='icon' variant='ghost' aria-label='Abrir ações' />}>
        <EllipsisVerticalIcon className='size-5' aria-hidden='true' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Editar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Duplicar</span>
          </DropdownMenuItem>
          <DropdownMenuItem variant='destructive'>
            <span>Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
