'use client'

// Third-party Imports
import { getRouteApi, Link } from '@tanstack/react-router'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { OrdemServicoLeftPanel } from './left-panel'
import { OrdemServicoTabs } from './ordem-servico-tabs'

// Data Imports
import { getOrdemServicoById } from '@/fake-db/operacional/ordens-servico'

// Hook Imports
import { useSimulatedLoading } from '@/hooks/use-simulated-loading'

const routeApi = getRouteApi('/_pages/ordens-servico/$id')

function OrdemServicoDetailSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-[350px_minmax(0,1fr)]'>
      <Card>
        <CardContent className='space-y-6 pt-6'>
          <div className='flex flex-col items-center gap-3'>
            <Skeleton className='h-6 w-28' />
            <Skeleton className='h-5 w-24' />
          </div>
          <div className='space-y-3'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </div>
          <div className='flex gap-2'>
            <Skeleton className='h-9 flex-1' />
            <Skeleton className='h-9 flex-1' />
          </div>
        </CardContent>
      </Card>

      <div className='space-y-4'>
        <Skeleton className='h-9 w-64' />
        <Skeleton className='h-48 w-full' />
      </div>
    </div>
  )
}

function OrdemServicoDetailContent({ id }: { id: string }) {
  const isLoading = useSimulatedLoading(400)
  const ordem = getOrdemServicoById(id)

  if (isLoading) {
    return <OrdemServicoDetailSkeleton />
  }

  if (!ordem) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center gap-4 py-12 text-center'>
          <p className='text-muted-foreground'>Ordem de serviço não encontrada.</p>
          <Button render={<Link to='/ordens-servico' />} nativeButton={false}>
            Voltar para Ordens de Serviço
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-[350px_minmax(0,1fr)]'>
      <OrdemServicoLeftPanel ordem={ordem} />
      <OrdemServicoTabs ordem={ordem} />
    </div>
  )
}

const OrdemServicoDetail = () => {
  const { id } = routeApi.useParams()

  return <OrdemServicoDetailContent key={id} id={id} />
}

export default OrdemServicoDetail
