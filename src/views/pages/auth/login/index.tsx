// Third-party Imports
import { Link } from '@tanstack/react-router'

// Components Import
import Logo from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import LoginForm from '@/views/pages/auth/login/login-form'

const gridPattern = {
  backgroundImage:
    'linear-gradient(to right, rgb(255 255 255 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.06) 1px, transparent 1px)',
  backgroundSize: '56px 56px'
}

const Login = () => {
  return (
    <div className='bg-muted flex min-h-screen items-center justify-center p-3 sm:p-6'>
      <div className='bg-card grid w-full max-w-7xl gap-3 rounded-[2rem] p-3 shadow-sm lg:min-h-[44rem] lg:grid-cols-2'>
        {/* Form side */}
        <div className='border-border flex flex-col rounded-3xl border px-6 py-8 sm:px-12'>
          <Link to='/' className='inline-flex w-fit'>
            <Logo className='gap-3' />
          </Link>

          <div className='mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 py-10'>
            <div className='text-center'>
              <h1 className='mb-2 text-3xl font-semibold'>Bem-vindo de volta</h1>
              <p className='text-muted-foreground text-base'>
                Acesse a SOS Compressores para acompanhar serviços, estoque e financeiro.
              </p>
            </div>

            <LoginForm />

            <div className='flex items-center gap-4'>
              <div className='bg-border h-px flex-1' />
              <p className='text-muted-foreground text-sm'>ou continue com</p>
              <div className='bg-border h-px flex-1' />
            </div>

            <Button variant='outline' className='w-full' render={<a href='#' />} nativeButton={false}>
              Entrar com o Google
            </Button>

            <p className='text-muted-foreground text-center text-base'>
              Novo na nossa plataforma?{' '}
              <Link to='/pages/auth/register' className='text-card-foreground font-medium hover:underline'>
                Criar uma conta
              </Link>
            </p>
          </div>
        </div>

        {/* Brand side */}
        <div className='from-primary relative hidden overflow-hidden rounded-3xl bg-linear-to-br via-green-900 to-green-950 lg:flex lg:flex-col lg:justify-center'>
          <div className='absolute inset-0' style={gridPattern} />
          <div className='absolute -top-32 -left-32 size-96 rounded-full bg-white/10 blur-3xl' />

          {/* Floating cards */}
          <div className='relative h-[28rem]'>
            <div className='text-card-foreground absolute top-[6%] left-[14%] w-64 rounded-2xl bg-white p-4 shadow-2xl ring-4 ring-white/10'>
              <div className='mb-3 flex items-center justify-between'>
                <p className='text-sm font-semibold'>Ordens de Serviço</p>
                <span className='rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700'>Hoje</span>
              </div>
              <p className='text-3xl font-bold text-neutral-900'>24</p>
              <p className='mb-3 text-xs text-neutral-500'>em andamento</p>
              <div className='h-2 overflow-hidden rounded-full bg-neutral-100'>
                <div className='bg-primary h-full w-[70%] rounded-full' />
              </div>
              <p className='mt-2 text-xs text-neutral-500'>70% concluídas no prazo</p>
            </div>

            <div className='absolute top-[26%] right-[8%] w-64 rounded-2xl bg-white p-4 text-neutral-900 shadow-2xl ring-4 ring-white/10'>
              <p className='mb-3 text-sm font-semibold'>Faturamento</p>
              <p className='text-2xl font-bold'>R$ 48.320,00</p>
              <p className='mb-3 text-xs font-medium text-green-600'>+12% no mês</p>
              <div className='flex h-14 items-end gap-1.5'>
                {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                  <div key={i} className='bg-primary/80 flex-1 rounded-sm' style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className='absolute top-[52%] left-[8%] w-72 rounded-2xl bg-white p-4 text-neutral-900 shadow-2xl ring-4 ring-white/10'>
              <div className='mb-3 flex items-center justify-between'>
                <p className='text-sm font-semibold'>Estoque</p>
                <span className='text-xs text-neutral-500'>Atualizado agora</span>
              </div>
              {[
                ['Compressor 12V', '18 un.'],
                ['Filtro secador', '42 un.'],
                ['Kit de vedação', '7 un.']
              ].map(([name, qty]) => (
                <div key={name} className='flex items-center justify-between border-t border-neutral-100 py-2 text-sm'>
                  <span>{name}</span>
                  <span className='text-neutral-500'>{qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logo badge */}
          <div className='relative mx-auto mt-5 rounded-2xl bg-black/40 p-3 ring-1 ring-white/20 backdrop-blur'>
            <img src='/images/logo.png' alt='SOS Compressores' className='h-14 object-contain' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
