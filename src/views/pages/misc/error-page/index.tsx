// Third-party Imports
import { Link } from '@tanstack/react-router'

// Component Imports
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center gap-9 p-6'>
      <h1 className='text-9xl font-bold'>4&#129396;4</h1>
      <div className='flex flex-col items-center gap-4 text-center'>
        <p className='text-muted-foreground text-xl sm:text-2xl'>Não encontramos a página que você está procurando</p>
        <Button className='rounded-full' render={<Link to='/' />} nativeButton={false}>
          Voltar para o início
        </Button>
      </div>
    </div>
  )
}

export default NotFound
