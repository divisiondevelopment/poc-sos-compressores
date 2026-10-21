// Third-party Imports
import { Trash2Icon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

const DangerZone = () => {
  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
      {/* Vertical Tabs List */}
      <div className='flex flex-col space-y-1'>
        <h3 className='text-base font-semibold'>Zona de perigo</h3>
        <p className='text-muted-foreground text-sm'>
          Gerencie configurações gerais do workspace. Contate o administrador do sistema para mais informações{' '}
          <a href='#' className='text-card-foreground font-medium hover:underline'>
            Saiba mais
          </a>
        </p>
      </div>

      {/* Content */}
      <div className='space-y-6 lg:col-span-2'>
        <Card>
          <CardContent>
            <div className='flex justify-between gap-4 max-lg:flex-col lg:items-center'>
              <div className='space-y-1'>
                <h3 className='text-sm font-medium'>Sair do workspace</h3>
                <p className='text-muted-foreground text-sm'>
                  Revogue seu acesso a esta equipe. As outras pessoas que você adicionou ao workspace permanecerão.
                </p>
              </div>
              <Dialog>
                <DialogTrigger
                  render={
                    <Button
                      variant='outline'
                      className='border-destructive! text-destructive! hover:bg-destructive/10! focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 max-lg:w-full'
                    />
                  }
                >
                  <Trash2Icon />
                  Sair
                </DialogTrigger>
                <DialogContent className='sm:max-w-md'>
                  <DialogHeader className='space-y-2'>
                    <DialogTitle>Sair do workspace</DialogTitle>
                    <div className='text-muted-foreground text-sm'>
                      Revogue seu acesso a esta equipe. As outras pessoas que você adicionou ao workspace permanecerão.
                    </div>
                  </DialogHeader>
                  <div className='flex flex-col-reverse gap-4 sm:flex-row sm:justify-end'>
                    <DialogClose render={<Button variant='outline' />}>Cancelar</DialogClose>
                    <DialogClose render={<Button variant='destructive' />}>Sair</DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <Card className='cursor-not-allowed opacity-60'>
          <CardContent>
            <div className='flex justify-between gap-4 max-lg:flex-col lg:items-center'>
              <div className='space-y-1'>
                <h3 className='text-sm font-medium'>Excluir workspace</h3>
                <p className='text-muted-foreground text-sm'>
                  Exclua seu workspace permanentemente. Esta ação removerá todos os dados e não pode ser desfeita.
                </p>
              </div>
              <Button
                variant='outline'
                className='hover:bg-destructive/10! text-destructive! border-destructive! focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 max-lg:w-full'
                disabled
              >
                <Trash2Icon />
                Excluir workspace
              </Button>
            </div>
            <Separator className='my-4' />
            <p className='text-muted-foreground text-sm'>
              Você não pode excluir o workspace porque não é o administrador do sistema.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DangerZone
