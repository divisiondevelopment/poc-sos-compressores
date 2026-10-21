'use client'

// Component Import
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const ForgotPasswordForm = () => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <FieldGroup className='gap-4'>
        {/* Email */}
        <Field>
          <FieldLabel className='leading-5' htmlFor='userEmail'>
            Endereço de e-mail*
          </FieldLabel>
          <Input type='email' id='userEmail' placeholder='Digite seu endereço de e-mail' />
        </Field>
        <Field>
          <Button className='w-full' type='submit'>
            Enviar Link de Redefinição
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default ForgotPasswordForm
