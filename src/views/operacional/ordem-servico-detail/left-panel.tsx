'use client'

// Third-party Imports
import { PhoneIcon, MapPinIcon } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Type Imports
import type { OrdemServico } from '@/fake-db/operacional/ordens-servico'

// Component Imports
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export interface OrdemServicoLeftPanelProps {
  ordem: OrdemServico
}

export function OrdemServicoLeftPanel({ ordem }: OrdemServicoLeftPanelProps) {
  const detailRows = [
    { label: 'Técnico responsável', value: ordem.tecnico },
    { label: 'Equipamento', value: ordem.equipamento },
    { label: 'Data de abertura', value: format(new Date(`${ordem.data}T00:00:00`), 'dd MMM yyyy', { locale: ptBR }) }
  ]

  return (
    <Card className='lg:sticky lg:top-20 lg:h-[calc(100dvh-7.5rem)] lg:overflow-y-auto'>
      <CardContent className='space-y-6 pt-6'>
        <div className='flex flex-col items-center text-center'>
          <h2 className='text-xl font-semibold'>{ordem.codigo}</h2>
          <StatusBadge>
            <span className='px-1'>{ordem.status}</span>
          </StatusBadge>
        </div>

        <div className='space-y-3'>
          <h3 className='text-sm font-semibold'>Dados Gerais</h3>
          <Separator />
          {detailRows.map(row => (
            <div key={row.label} className='flex items-center justify-between gap-4 text-sm'>
              <span className='text-muted-foreground'>{row.label}</span>
              <span className='truncate text-right font-medium'>{row.value}</span>
            </div>
          ))}
        </div>

        <div className='space-y-3'>
          <h3 className='text-sm font-semibold'>Cliente Vinculado</h3>
          <Separator />
          <p className='text-sm font-medium'>{ordem.cliente}</p>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            <PhoneIcon className='size-4 shrink-0' />
            <span>{ordem.clienteContato}</span>
          </div>
          <div className='text-muted-foreground flex items-center gap-2 text-sm'>
            <MapPinIcon className='size-4 shrink-0' />
            <span>{ordem.clienteEndereco}</span>
          </div>
        </div>

        <div className='flex gap-2 max-sm:flex-col'>
          <Button
            className='sm:flex-1'
            onClick={() => toast.success(`Ordem de serviço ${ordem.codigo} atualizada com sucesso`)}
          >
            Editar
          </Button>
          <Button
            variant='outline'
            className='sm:flex-1'
            onClick={() => toast.success(`Status da ordem ${ordem.codigo} atualizado`)}
          >
            Mudar Status
          </Button>
          <Button
            variant='outline'
            className='text-destructive hover:bg-destructive/10 hover:text-destructive sm:flex-1'
            onClick={() => toast.success(`Ordem de serviço ${ordem.codigo} excluída com sucesso`)}
          >
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
