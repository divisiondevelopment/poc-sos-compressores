'use client'

// React Imports
import { useMemo, useState } from 'react'

// Third-party Imports
import type { ColumnDef, PaginationState } from '@tanstack/react-table'
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeftIcon, ChevronRightIcon, EllipsisVerticalIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { OrdemServicoFormDialog } from '@/views/operacional/ordem-servico-form/ordem-servico-form-dialog'

// Data Imports
import { ordensServicoData, type OrdemServico } from '@/fake-db/operacional/ordens-servico'

// Hook Imports
import { usePagination } from '@/hooks/use-pagination'

// Util Imports
import { formatCurrencyBRL } from '@/lib/utils'

const PAGE_SIZE = 5

const getTotal = (ordem: OrdemServico) => ordem.itens.reduce((sum, i) => sum + i.quantidade * i.valorUnitario, 0)

const getInitials = (nome: string) =>
  nome
    .split(' ')
    .filter(part => part.length > 2)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()

const formatDate = (date: string) => format(new Date(`${date}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })

const getColumns = (onOpen: (ordem: OrdemServico) => void): ColumnDef<OrdemServico>[] => [
  {
    accessorKey: 'codigo',
    header: 'OS',
    cell: ({ row }) => <span className='font-medium'>{row.original.codigo}</span>
  },
  {
    accessorKey: 'cliente',
    header: 'Cliente',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar className='size-9'>
          <AvatarFallback className='bg-primary/10 text-primary text-xs'>
            {getInitials(row.original.cliente)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col text-sm'>
          <span className='text-card-foreground font-medium'>{row.original.cliente}</span>
          <span className='text-muted-foreground'>{row.original.clienteContato}</span>
        </div>
      </div>
    )
  },
  {
    accessorKey: 'equipamento',
    header: 'Equipamento',
    cell: ({ row }) => (
      <div className='flex flex-col text-sm'>
        <span>{row.original.equipamento}</span>
        <span className='text-muted-foreground'>{row.original.itens.length} item(ns)</span>
      </div>
    )
  },
  { accessorKey: 'tecnico', header: 'Técnico' },
  {
    accessorKey: 'data',
    header: 'Abertura',
    cell: ({ row }) => <span className='whitespace-nowrap'>{formatDate(row.original.data)}</span>
  },
  {
    id: 'valor',
    header: 'Valor',
    cell: ({ row }) => <span className='whitespace-nowrap'>{formatCurrencyBRL(getTotal(row.original))}</span>
  },
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
            <DropdownMenuItem onClick={() => onOpen(row.original)}>
              <span>Visualizar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onOpen(row.original)}>
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success(`Status da ordem ${row.original.codigo} atualizado`)}>
              <span>Mudar Status</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 60,
    enableHiding: false
  }
]

const RecentOrdensServico = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selected, setSelected] = useState<OrdemServico | undefined>()
  const [version, setVersion] = useState(0)
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: PAGE_SIZE })

  const openOrdem = (ordem: OrdemServico) => {
    setSelected(ordem)
    setDialogOpen(true)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = useMemo(() => [...ordensServicoData].sort((a, b) => b.data.localeCompare(a.data)), [version])
  const columns = useMemo(() => getColumns(openOrdem), [])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination }
  })

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: pagination.pageIndex + 1,
    totalPages: table.getPageCount(),
    paginationItemsToDisplay: 2
  })

  const totalRows = table.getRowCount()
  const showingFrom = pagination.pageIndex * PAGE_SIZE + 1
  const showingTo = Math.min(showingFrom + PAGE_SIZE - 1, totalRows)

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between gap-4 border-b p-6'>
        <div>
          <h2 className='text-lg font-semibold'>Ordens de Serviço Recentes</h2>
          <p className='text-muted-foreground text-sm'>Últimas ordens abertas, com cliente, técnico e valor.</p>
        </div>
        <Button variant='outline' render={<Link to='/ordens-servico' />} nativeButton={false}>
          Ver todas
        </Button>
      </div>

      <div className='border-b'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className='text-muted-foreground h-14 first:pl-4'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  onClick={() => openOrdem(row.original)}
                  className='hover:bg-muted/50 cursor-pointer'
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className='first:pl-4'
                      onClick={event => {
                        if (cell.column.id === 'actions') event.stopPropagation()
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  Nenhuma ordem de serviço encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center justify-between gap-3 px-6 py-4 max-sm:flex-col md:max-lg:flex-col'>
        <p className='text-muted-foreground text-sm whitespace-nowrap' aria-live='polite'>
          Exibindo <span>{showingFrom}</span> a <span>{showingTo}</span> de <span>{totalRows}</span> itens
        </p>

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
              const isActive = page === pagination.pageIndex + 1

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

      <OrdemServicoFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        ordem={selected}
        onSaved={() => setVersion(v => v + 1)}
      />
    </div>
  )
}

export default RecentOrdensServico
