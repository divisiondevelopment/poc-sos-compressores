'use client'

// React Imports
import { useEffect } from 'react'

// Third-party Imports
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

// Type Imports
import type { AppUser, UserFormData, UserPlan, UserRole, UserSheetMode, UserStatus } from '@/types/apps/user-types'

// Component Imports
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const ROLES: UserRole[] = ['Admin', 'Editor', 'Subscriber', 'Maintainer', 'Guest']
const PLANS: UserPlan[] = ['Basic', 'Team', 'Enterprise']
const STATUSES: UserStatus[] = ['Active', 'Pending', 'Suspended', 'Inactive']

// Kept in English on purpose: these values must match the `country` field already stored on
// fake-db/apps/users.ts records (e.g. 'United States', 'Brazil'), which this sheet also uses
// when editing an existing user. Translating one side without the other would break that match.
const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'India',
  'Japan',
  'Brazil',
  'Netherlands',
  'Singapore',
  'Spain',
  'Italy',
  'Mexico',
  'South Korea'
]

const userFormSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
  contact: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  role: z.enum(['Admin', 'Editor', 'Subscriber', 'Maintainer', 'Guest']),
  plan: z.enum(['Basic', 'Team', 'Enterprise']),
  status: z.enum(['Active', 'Pending', 'Suspended', 'Inactive'])
})

type UserFormValues = z.infer<typeof userFormSchema>

const defaultValues: UserFormValues = {
  name: '',
  email: '',
  contact: '',
  company: '',
  country: '',
  role: 'Subscriber',
  plan: 'Basic',
  status: 'Active'
}

export interface AddEditUserSheetProps {
  mode: UserSheetMode | null
  user: AppUser | null
  onClose: () => void
  onAdd: (data: UserFormData) => void
  onEdit: (id: string, data: Partial<UserFormData>) => void
}

export function AddEditUserSheet({ mode, user, onClose, onAdd, onEdit }: AddEditUserSheetProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues
  })

  useEffect(() => {
    if (mode === 'edit' && user) {
      form.reset({
        name: user.name,
        email: user.email,
        contact: user.contact ?? '',
        company: user.company ?? '',
        country: user.country ?? '',
        role: user.role,
        plan: user.plan,
        status: user.status
      })

      return
    }

    if (mode === 'add') {
      form.reset(defaultValues)
    }
  }, [form, mode, user])

  const handleSubmit = (values: UserFormValues) => {
    const data: UserFormData = {
      name: values.name,
      email: values.email,
      contact: values.contact || undefined,
      company: values.company || undefined,
      country: values.country || undefined,
      role: values.role,
      plan: values.plan,
      status: values.status
    }

    if (mode === 'add') {
      onAdd(data)
    }

    if (mode === 'edit' && user) {
      onEdit(user.id, data)
    }
  }

  return (
    <Sheet open={mode !== null} onOpenChange={open => !open && onClose()}>
      <SheetContent side='right' className='w-full overflow-y-auto sm:max-w-[420px]'>
        <SheetHeader className='pb-0'>
          <SheetTitle className='text-lg font-medium'>
            {mode === 'edit' ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4 px-4 pb-4'>
          <FieldGroup className='gap-4'>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                  <Input {...field} id={field.name} placeholder='Nome completo' aria-invalid={fieldState.invalid} />
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />

            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type='email'
                    placeholder='name@example.com'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />

            <Controller
              name='contact'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor={field.name}>Contato</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type='tel'
                    placeholder='+1 (555) 000-0000'
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />

            <Controller
              name='company'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor={field.name}>Empresa</FieldLabel>
                  <Input {...field} id={field.name} placeholder='Nome da empresa' aria-invalid={fieldState.invalid} />
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />

            <Controller
              name='country'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='country'>País</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id='country' className='w-full'>
                      <SelectValue placeholder='Selecionar país' />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />

            <Controller
              name='role'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='role'>Função</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id='role' className='w-full'>
                      <SelectValue placeholder='Selecionar função' />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {ROLES.map(role => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />

            <Controller
              name='plan'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='plan'>Plano</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id='plan' className='w-full'>
                      <SelectValue placeholder='Selecionar plano' />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {PLANS.map(plan => (
                          <SelectItem key={plan} value={plan}>
                            {plan}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />

            <Controller
              name='status'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className='gap-2'>
                  <FieldLabel htmlFor='status'>Status</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id='status' className='w-full'>
                      <SelectValue placeholder='Selecionar status' />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false}>
                      <SelectGroup>
                        {STATUSES.map(status => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </Field>
              )}
            />
          </FieldGroup>

          <SheetFooter className='px-0 sm:flex-row'>
            <Button type='submit' variant='outline' onClick={onClose} className='sm:flex-1'>
              Cancelar
            </Button>
            <Button type='submit' className='sm:flex-1'>
              Salvar Alterações
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
