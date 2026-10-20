'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Third-party Imports
import { useNavigate, type LinkProps } from '@tanstack/react-router'

import { SearchIcon } from 'lucide-react'

// Component Imports
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

// Config Imports
import { navItems, type MenuGroupSubItem, type MenuSubItem } from '@/configs/navConfig'

// Data Imports
import { ordensServicoData } from '@/fake-db/operacional/ordens-servico'

type PaletteEntry = {
  id: string
  label: string
  href: string
  group: string
}

const isSubGroup = (item: MenuSubItem): item is MenuGroupSubItem => 'childItems' in item

const isNavigableHref = (href: string) => !href.startsWith('#') && !href.startsWith('http')

function buildNavEntries(): PaletteEntry[] {
  const entries: PaletteEntry[] = []

  const visitSubItems = (items: MenuSubItem[], parentLabel: string, group: string) => {
    items.forEach(item => {
      if (isSubGroup(item)) {
        visitSubItems(item.childItems, item.label, group)
      } else if (isNavigableHref(item.href)) {
        entries.push({
          id: `${group}-${parentLabel}-${item.label}`,
          label: `${parentLabel} - ${item.label}`,
          href: item.href,
          group
        })
      }
    })
  }

  navItems.forEach(navGroup => {
    const group = navGroup.groupLabel ?? 'Navegação'

    navGroup.items.forEach(item => {
      if (item.childItems) {
        visitSubItems(item.childItems, item.label, group)
      } else if (item.href && isNavigableHref(item.href)) {
        entries.push({ id: `${group}-${item.label}`, label: item.label, href: item.href, group })
      }
    })
  })

  return entries
}

const navEntries = buildNavEntries()

const ordemServicoEntries: PaletteEntry[] = ordensServicoData.map(ordem => ({
  id: `ordem-servico-${ordem.id}`,
  label: `${ordem.codigo} - ${ordem.cliente}`,
  href: `/ordens-servico/${ordem.id}`,
  group: 'Ordens de Serviço'
}))

const allEntries = [...navEntries, ...ordemServicoEntries]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(value => !value)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const groupedEntries = useMemo(() => {
    const groups = new Map<string, PaletteEntry[]>()

    allEntries.forEach(entry => {
      const list = groups.get(entry.group) ?? []

      list.push(entry)
      groups.set(entry.group, list)
    })

    return groups
  }, [])

  const handleSelect = (href: string) => {
    setOpen(false)

    const [to, query] = href.split('?')

    navigate({
      to: to as LinkProps['to'],
      search: (query ? Object.fromEntries(new URLSearchParams(query)) : {}) as never
    })
  }

  return (
    <>
      <div className='hidden flex-1 justify-center sm:flex'>
        <InputGroup className='max-w-sm cursor-pointer' onClick={() => setOpen(true)}>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput readOnly placeholder='Buscar OS, cliente, fornecedor, peça...' className='cursor-pointer' />
          <InputGroupAddon align='inline-end'>
            <kbd className='bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center rounded px-1.5 font-mono text-[10px] font-medium select-none'>
              ⌘K
            </kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title='Busca global'
        description='Buscar telas, ordens de serviço e clientes'
      >
        <Command>
          <CommandInput placeholder='Buscar telas, ordens de serviço...' />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            {Array.from(groupedEntries.entries()).map(([group, entries]) => (
              <CommandGroup key={group} heading={group}>
                {entries.map(entry => (
                  <CommandItem key={entry.id} value={entry.label} onSelect={() => handleSelect(entry.href)}>
                    {entry.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
