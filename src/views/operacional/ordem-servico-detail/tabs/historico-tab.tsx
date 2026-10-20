// Third-party Imports
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Type Imports
import type { OrdemServico } from '@/fake-db/operacional/ordens-servico'

// Component Imports
import { Card, CardContent } from '@/components/ui/card'
import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine
} from '@/components/ui/timeline'

export interface HistoricoTabProps {
  ordem: OrdemServico
}

export function HistoricoTab({ ordem }: HistoricoTabProps) {
  return (
    <Card>
      <CardContent>
        <Timeline>
          {ordem.historico.map((entry, index) => {
            const isLast = index === ordem.historico.length - 1

            return (
              <TimelineItem key={`${entry.data}-${entry.status}`} status='done' className='gap-x-0'>
                <TimelineDot
                  status='custom'
                  className='bg-primary/20 flex size-4.5 shrink-0 items-center justify-center rounded-full'
                >
                  <span className='bg-primary size-3 rounded-full' />
                </TimelineDot>
                {!isLast && <TimelineLine done className='bg-muted min-h-10' />}
                <TimelineHeading className='text-foreground flex w-full items-center justify-between pt-2.5 pb-2 pl-4 text-sm font-medium text-wrap md:text-base'>
                  {entry.status}
                  <span className='text-muted-foreground text-xs font-normal text-nowrap md:text-sm'>
                    {format(new Date(`${entry.data}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })}
                  </span>
                </TimelineHeading>
                {entry.observacao ? (
                  <TimelineContent className='flex flex-col gap-2 pb-3 pl-4'>
                    <span className='text-muted-foreground text-sm'>{entry.observacao}</span>
                  </TimelineContent>
                ) : null}
              </TimelineItem>
            )
          })}
        </Timeline>
      </CardContent>
    </Card>
  )
}
