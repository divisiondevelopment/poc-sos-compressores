// Third-party Imports
import { Link } from '@tanstack/react-router'

// Component Import
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// SVG Import
import AuthBackgroundShape from '@/assets/svg/auth-background-shape'

const VerifyEmail = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full gap-6 py-6 sm:max-w-md'>
        <CardHeader className='gap-6 px-6'>
          <Link to='/'>
            <Logo className='justify-center gap-3' />
          </Link>

          <div className='text-center'>
            <CardTitle className='mb-2 text-2xl font-semibold'>Verifique seu e-mail</CardTitle>
            <CardDescription className='text-base'>
              Um link de ativação foi enviado para o seu endereço de e-mail: hello@example.com. Verifique sua caixa de
              entrada e clique no link para concluir o processo de ativação.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          <div className='space-y-4'>
            <Button className='w-full' render={<a href='#' />} nativeButton={false}>
              Pular por agora
            </Button>

            <p className='text-muted-foreground text-center text-base'>
              Não recebeu o e-mail?{' '}
              <a href='#' className='text-card-foreground hover:underline'>
                Reenviar
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerifyEmail
