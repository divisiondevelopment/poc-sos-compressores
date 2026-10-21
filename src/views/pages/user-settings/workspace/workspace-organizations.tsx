// Third-party Imports
import { Trash2Icon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

const WorkspaceOrganizations = () => {
  const organizations = [
    {
      id: 'notion',
      name: 'Notion',
      img: '/images/brands/notion-white.webp',
      description: 'membro e colaborador em projetos de produto e documentação'
    },
    {
      id: 'github',
      name: 'Github',
      img: '/images/brands/github-white.webp',
      description: 'colaborador do repositório e mantenedor de CI'
    },
    {
      id: 'discord',
      name: 'Discord',
      img: '/images/brands/discord.webp',
      description: 'moderador da comunidade e membro do canal de suporte'
    }
  ]

  return (
    <div>
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
        {/* Workspace Organizations */}
        <div className='flex flex-col space-y-1'>
          <h3 className='text-base font-semibold'>Organizações</h3>
          <p className='text-muted-foreground text-sm'>Gerencie as organizações e configurações do seu workspace.</p>
        </div>
        {/* Content */}
        <div className='space-y-6 lg:col-span-2'>
          <Card>
            <CardContent>
              {organizations.map(org => (
                <div key={org.id}>
                  <div className='flex items-center justify-between gap-4 max-sm:flex-wrap'>
                    <div className='flex items-center gap-4'>
                      <img src={org.img} alt={org.name} className='h-8' />
                      <p className='text-muted-foreground text-sm'>
                        <a href='#' className='font-medium text-sky-600 hover:underline dark:text-sky-400'>
                          {org.name}
                        </a>{' '}
                        {org.description}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger
                        render={
                          <Button
                            variant='outline'
                            className='border-destructive! text-destructive! hover:bg-destructive/10! focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 max-sm:w-full'
                          />
                        }
                      >
                        <Trash2Icon />
                        Sair
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-md'>
                        <DialogHeader className='space-y-2'>
                          <DialogTitle>Tem certeza?</DialogTitle>
                          <div className='text-muted-foreground text-sm'>
                            Tem certeza de que deseja sair desta organização?
                          </div>
                        </DialogHeader>
                        <div className='flex flex-col-reverse gap-4 sm:flex-row sm:justify-end'>
                          <DialogClose render={<Button variant='outline' />}>Cancelar</DialogClose>
                          <DialogClose render={<Button variant='destructive' />}>Sair</DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  {org !== organizations[organizations.length - 1] && <Separator className='my-4' />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceOrganizations
