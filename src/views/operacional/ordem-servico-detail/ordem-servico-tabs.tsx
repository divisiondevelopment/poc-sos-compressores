// Type Imports
import type { OrdemServico } from '@/fake-db/operacional/ordens-servico'

// Component Imports
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HistoricoTab } from './tabs/historico-tab'
import { ItensTab } from './tabs/itens-tab'

export interface OrdemServicoTabsProps {
  ordem: OrdemServico
}

export function OrdemServicoTabs({ ordem }: OrdemServicoTabsProps) {
  return (
    <Tabs defaultValue='itens' className='flex-1 justify-between gap-6'>
      <div className='overflow-x-auto'>
        <TabsList className='w-max min-w-full **:group-data-[orientation=horizontal]/tabs:after:h-0'>
          <TabsTrigger value='itens'>Itens e Serviços</TabsTrigger>
          <TabsTrigger value='historico'>Histórico</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value='itens'>
        <ItensTab ordem={ordem} />
      </TabsContent>
      <TabsContent value='historico'>
        <HistoricoTab ordem={ordem} />
      </TabsContent>
    </Tabs>
  )
}
