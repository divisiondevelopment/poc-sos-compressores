// Third-party Imports
import type { ColumnDef } from '@tanstack/react-table'

import { EllipsisVerticalIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

function ListRowActions() {
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

export function createListActionsColumn<TData>(): ColumnDef<TData> {
  return {
    id: 'actions',
    header: () => 'Ações',
    cell: () => <ListRowActions />,
    size: 60,
    enableHiding: false
  }
}
