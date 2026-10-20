'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, SearchIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// Hook Imports
import { usePagination } from '@/hooks/use-pagination'

const PAGE_SIZE = 10

export type SimpleListViewProps<TData> = {
  title: string
  description?: string
  searchPlaceholder: string
  actionLabel: string
  columns: ColumnDef<TData, any>[]
  data: TData[]
  emptyMessage?: string
}

export function SimpleListView<TData>({
  title,
  description,
  searchPlaceholder,
  actionLabel,
  columns,
  data,
  emptyMessage = 'Nenhum registro encontrado.'
}: SimpleListViewProps<TData>) {
  const [search, setSearch] = useState('')
  const [pageIndex, setPageIndex] = useState(0)

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setSearch,
    state: {
      globalFilter: search,
      pagination: { pageIndex, pageSize: PAGE_SIZE }
    },
    onPaginationChange: updater => {
      const next = typeof updater === 'function' ? updater({ pageIndex, pageSize: PAGE_SIZE }) : updater

      setPageIndex(next.pageIndex)
    }
  })

  const totalRows = table.getFilteredRowModel().rows.length
  const totalPages = table.getPageCount()
  const showingFrom = totalRows === 0 ? 0 : pageIndex * PAGE_SIZE + 1
  const showingTo = Math.min(pageIndex * PAGE_SIZE + PAGE_SIZE, totalRows)

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: pageIndex + 1,
    totalPages: totalPages || 1,
    paginationItemsToDisplay: 2
  })

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPageIndex(0)
  }

  return (
    <div className='flex flex-col gap-3 lg:gap-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-xl font-semibold'>{title}</h1>
        {description && <p className='text-muted-foreground text-sm'>{description}</p>}
      </div>

      <Card className='py-0 shadow-none'>
        <div className='w-full'>
          <div className='border-b'>
            <div className='flex gap-4 p-6 max-sm:flex-col sm:items-center sm:justify-between'>
              <div className='w-full max-w-2xs'>
                <Label htmlFor='simple-list-search' className='sr-only'>
                  {searchPlaceholder}
                </Label>
                <InputGroup>
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id='simple-list-search'
                    value={search}
                    onChange={event => handleSearchChange(event.target.value)}
                    placeholder={searchPlaceholder}
                    type='text'
                  />
                </InputGroup>
              </div>

              <Button>
                <PlusIcon />
                <span>{actionLabel}</span>
              </Button>
            </div>

            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id} className='h-14 border-t'>
                    {headerGroup.headers.map(header => (
                      <TableHead
                        key={header.id}
                        className='text-muted-foreground first:pl-4 last:px-4 last:text-center'
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className='first:pl-4 last:px-4 last:text-center'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      {emptyMessage}
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

            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      className='disabled:pointer-events-none disabled:opacity-50'
                      variant='ghost'
                      onClick={() => setPageIndex(index => Math.max(index - 1, 0))}
                      disabled={!table.getCanPreviousPage()}
                      aria-label='Ir para a página anterior'
                    >
                      <ChevronLeftIcon aria-hidden='true' />
                      <span className='max-sm:hidden'>Anterior</span>
                    </Button>
                  </PaginationItem>

                  {showLeftEllipsis && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {pages.map(page => {
                    const isActive = page === pageIndex + 1

                    return (
                      <PaginationItem key={page}>
                        <Button
                          size='icon'
                          className={`${!isActive && 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'}`}
                          onClick={() => setPageIndex(page - 1)}
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
                      onClick={() => setPageIndex(index => Math.min(index + 1, Math.max(totalPages - 1, 0)))}
                      disabled={!table.getCanNextPage()}
                      aria-label='Ir para a próxima página'
                    >
                      <span className='max-sm:hidden'>Próxima</span>
                      <ChevronRightIcon aria-hidden='true' />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
