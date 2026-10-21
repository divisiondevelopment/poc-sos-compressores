// Third-party Imports
import { Link } from '@tanstack/react-router'

// Component Imports
import Logo from '@/components/shared/Logo'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TwoStepsForm from '@/views/pages/auth/two-steps/two-steps-form'

// SVG Imports
import AuthBackgroundShape from '@/assets/svg/auth-background-shape'

const TwoSteps = () => {
  return (
    <div className='relative flex h-auto min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <div className='absolute'>
        <AuthBackgroundShape />
      </div>

      <Card className='z-1 w-full gap-6 overflow-clip py-6 sm:max-w-md'>
        <CardHeader className='px-6'>
          <Link to='/'>
            <Logo className='gap-3' />
          </Link>
        </CardHeader>

        <CardContent className='space-y-6 px-6'>
          <div>
            <CardTitle className='mb-2 text-2xl font-semibold'>Verificação em Duas Etapas</CardTitle>
            <CardDescription className='text-base'>
              Confirme o acesso à sua conta inserindo o código fornecido pelo seu aplicativo autenticador
            </CardDescription>
          </div>

          {/* TwoSteps Form */}
          <TwoStepsForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default TwoSteps
