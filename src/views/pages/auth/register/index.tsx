// Third-party Imports
import { Link } from '@tanstack/react-router'

// Component Import
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import RegisterForm from '@/views/pages/auth/register/register-form'

// SVG Import
import AuthBackgroundShape from '@/assets/svg/auth-background-shape'

const Register = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full gap-6 py-6 sm:max-w-lg'>
        <CardHeader className='gap-6 px-6'>
          <Link to='/'>
            <Logo className='gap-3' />
          </Link>

          <div>
            <CardTitle className='mb-2 text-2xl font-semibold'>Cadastrar na SOS Compressores</CardTitle>
            <CardDescription className='text-base'>Vá mais rápido e foque no crescimento.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className='px-6'>
          {/* Register Form */}
          <div className='space-y-4'>
            <RegisterForm />

            <p className='text-muted-foreground text-center'>
              Já tem uma conta?{' '}
              <Link to='/pages/auth/login' className='text-card-foreground hover:underline'>
                Entrar
              </Link>
            </p>

            <div className='flex items-center gap-4'>
              <Separator className='flex-1' />
              <p className='text-base'>ou</p>
              <Separator className='flex-1' />
            </div>

            <Button variant='ghost' className='w-full' render={<a href='#' />} nativeButton={false}>
              Entrar com o Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
