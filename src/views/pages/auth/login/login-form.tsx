'use client'

// Rect Import
import { useState } from 'react'

// Third-party Imports
import { Link } from '@tanstack/react-router'

// Third-party Imports
import { EyeIcon, EyeOffIcon } from 'lucide-react'

// Components Import
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        {/* Email */}
        <Field className='gap-2'>
          <FieldLabel htmlFor='userEmail' className='leading-5'>
            Endereço de e-mail*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Digite seu endereço de e-mail' />
        </Field>
        {/* Password */}
        <Field className='w-full gap-2'>
          <FieldLabel htmlFor='password' className='leading-5'>
            Senha*
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id='password' type={isVisible ? 'text' : 'password'} placeholder='••••••••••••••••' />
            <InputGroupAddon align='inline-end' className='pr-1.5'>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => setIsVisible(prevState => !prevState)}
                className='text-muted-foreground rounded-l-none hover:bg-transparent'
              >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                <span className='sr-only'>{isVisible ? 'Ocultar senha' : 'Mostrar senha'}</span>
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        {/* Lembrar de mim and Forgot Password */}
        <div className='flex items-center justify-between gap-y-2'>
          <Field orientation='horizontal' className='flex items-center gap-2'>
            <Checkbox id='rememberMe' />
            <FieldLabel htmlFor='rememberMe' className='text-muted-foreground'>
              {' '}
              Lembrar de mim
            </FieldLabel>
          </Field>
          <Link to='/pages/auth/forgot-password' className='text-base text-nowrap hover:underline'>
            Esqueceu a senha?
          </Link>
        </div>
        <Field>
          <Button className='w-full' type='submit'>
            Entrar na SOS Compressores
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginForm
