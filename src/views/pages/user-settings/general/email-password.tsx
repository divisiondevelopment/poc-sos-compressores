'use client'

// React Imports
import { useMemo, useState } from 'react'

// Third-party Imports
import { CheckIcon, EyeIcon, EyeOffIcon, MailIcon, XIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'

// Util Imports
import { cn } from '@/lib/utils'

const requirements = [
  { regex: /.{12,}/, text: 'Pelo menos 12 caracteres' },
  { regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
  { regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúscula' },
  { regex: /[0-9]/, text: 'Pelo menos 1 número' },
  {
    regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
    text: 'Pelo menos 1 caractere especial'
  }
]

const EmailPass = () => {
  const [isVisible, setIsVisible] = useState(false)

  const [password, setPassword] = useState('')

  const toggleVisibility = () => setIsVisible(prevState => !prevState)

  const strength = requirements.map(req => ({
    met: req.regex.test(password),
    text: req.text
  }))

  const strengthScore = useMemo(() => {
    return strength.filter(req => req.met).length
  }, [strength])

  const getColor = (score: number) => {
    if (score === 0) return 'bg-border'
    if (score <= 1) return 'bg-destructive'
    if (score <= 2) return 'bg-orange-500 '
    if (score <= 3) return 'bg-amber-500'
    if (score === 4) return 'bg-yellow-400'

    return 'bg-green-500'
  }

  const getText = (score: number) => {
    if (score === 0) return 'Digite uma senha'
    if (score <= 2) return 'Senha fraca'
    if (score <= 3) return 'Senha média'
    if (score === 4) return 'Senha forte'

    return 'Senha muito forte'
  }

  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
      {/* Vertical Tabs List */}
      <div className='flex flex-col space-y-1'>
        <h3 className='text-base font-semibold'>E-mail e Senha</h3>
        <p className='text-muted-foreground text-sm'>Gerencie suas configurações de e-mail e senha.</p>
      </div>

      {/* Content */}
      <div className='lg:col-span-2'>
        <form className='mx-auto space-y-6'>
          <div className='w-full space-y-2'>
            <Label htmlFor='email' className='gap-1'>
              E-mail<span className='text-destructive'>*</span>
            </Label>
            <InputGroup>
              <InputGroupInput id='email' type='email' placeholder='Endereço de e-mail' required />
              <InputGroupAddon align='inline-end' className='pr-2.75'>
                <MailIcon className='size-4' />
                <span className='sr-only'>E-mail</span>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className='w-full space-y-2'>
            <Label htmlFor='current-password' className='gap-1'>
              Senha Atual<span className='text-destructive'>*</span>
            </Label>
            <InputGroup>
              <InputGroupInput
                id='current-password'
                type={isVisible ? 'text' : 'password'}
                placeholder='Senha'
                required
              />
              <InputGroupAddon align='inline-end' className='pr-1.5'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => setIsVisible(prevState => !prevState)}
                  className='text-muted-foreground focus-visible:ring-ring/50 rounded-l-none hover:bg-transparent'
                >
                  {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  <span className='sr-only'>{isVisible ? 'Ocultar senha' : 'Mostrar senha'}</span>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className='w-full space-y-2'>
            <Label htmlFor='new-password' className='gap-1'>
              Nova Senha<span className='text-destructive'>*</span>
            </Label>
            <InputGroup className='mb-3'>
              <InputGroupInput
                id='new-password'
                type={isVisible ? 'text' : 'password'}
                placeholder='Senha'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <InputGroupAddon align='inline-end' className='pr-1.5'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={toggleVisibility}
                  className='text-muted-foreground focus-visible:ring-ring/50 rounded-l-none hover:bg-transparent'
                >
                  {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  <span className='sr-only'>{isVisible ? 'Ocultar senha' : 'Mostrar senha'}</span>
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <div className='mb-4 flex h-1 w-full gap-1'>
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    'h-full flex-1 rounded-full transition-all duration-500 ease-out',
                    index < strengthScore ? getColor(strengthScore) : 'bg-border'
                  )}
                />
              ))}
            </div>

            <p className='text-foreground text-sm font-medium'>{getText(strengthScore)}. Deve conter:</p>

            <ul className='mb-4 space-y-1.5'>
              {strength.map((req, index) => (
                <li key={index} className='flex items-center gap-2'>
                  {req.met ? (
                    <CheckIcon className='size-4 text-green-600 dark:text-green-400' />
                  ) : (
                    <XIcon className='text-muted-foreground size-4' />
                  )}
                  <span
                    className={cn('text-xs', req.met ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground')}
                  >
                    {req.text}
                    <span className='sr-only'>{req.met ? ' - Requisito atendido' : ' - Requisito não atendido'}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className='mt-6 flex justify-end'>
            <Button type='submit' className='max-sm:w-full'>
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailPass
