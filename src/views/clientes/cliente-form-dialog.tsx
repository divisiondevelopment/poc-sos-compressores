'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { toast } from 'sonner'

// Component Imports
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

// Hook Imports
import { useSimulatedLoading } from '@/hooks/use-simulated-loading'

// Data Imports
import { clientesData, type Cliente, type ClienteStatus } from '@/fake-db/cadastros/clientes'

type FormState = Omit<Cliente, 'id'>

const emptyState: FormState = {
  nome: '',
  documento: '',
  email: '',
  telefone: '',
  endereco: '',
  cidade: '',
  status: 'Ativo',
  observacoes: ''
}

function TextField({
  label,
  value,
  onChange,
  className
}: {
  label: string
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  return (
    <Field className={`gap-2 ${className ?? ''}`}>
      <FieldLabel>{label}</FieldLabel>
      <Input value={value} onChange={e => onChange(e.target.value)} />
    </Field>
  )
}

function FormBody({ cliente, onClose, onSaved }: { cliente?: Cliente; onClose: () => void; onSaved?: () => void }) {
  const isLoading = useSimulatedLoading(350)
  const [form, setForm] = useState<FormState>(() => (cliente ? { ...cliente } : emptyState))

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSave = () => {
    if (!form.nome.trim()) {
      toast.error('Informe o nome do cliente')

      return
    }

    if (cliente) {
      Object.assign(cliente, form)
      toast.success(`Cliente ${form.nome} atualizado com sucesso`)
    } else {
      clientesData.unshift({ ...form, id: String(clientesData.length + 1) })
      toast.success(`Cliente ${form.nome} criado com sucesso`)
    }

    onSaved?.()
    onClose()
  }

  if (isLoading) {
    return (
      <>
        <div className='space-y-2 pr-10'>
          <DialogTitle className='text-lg font-semibold'>{cliente ? cliente.nome : 'Novo Cliente'}</DialogTitle>
          <Skeleton className='h-4 w-32' />
        </div>
        <div className='grid gap-4 sm:grid-cols-2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-9 w-full' />
            </div>
          ))}
        </div>
        <Skeleton className='h-20 w-full' />
      </>
    )
  }

  return (
    <>
      <div className='pr-10'>
        <DialogTitle className='text-lg font-semibold'>{cliente ? cliente.nome : 'Novo Cliente'}</DialogTitle>
        <DialogDescription>Cadastro do cliente.</DialogDescription>
      </div>

      <div className='grid gap-4 sm:grid-cols-2'>
        <TextField
          className='sm:col-span-2'
          label='Nome / Razão social*'
          value={form.nome}
          onChange={v => set('nome', v)}
        />
        <TextField label='CPF / CNPJ' value={form.documento} onChange={v => set('documento', v)} />
        <Field className='gap-2'>
          <FieldLabel>Status</FieldLabel>
          <Select value={form.status} onValueChange={val => set('status', (val ?? 'Ativo') as ClienteStatus)}>
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Ativo'>Ativo</SelectItem>
              <SelectItem value='Inativo'>Inativo</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <TextField label='Telefone' value={form.telefone} onChange={v => set('telefone', v)} />
        <TextField label='E-mail' value={form.email} onChange={v => set('email', v)} />
        <TextField label='Endereço' value={form.endereco} onChange={v => set('endereco', v)} />
        <TextField label='Cidade' value={form.cidade} onChange={v => set('cidade', v)} />
        <Field className='gap-2 sm:col-span-2'>
          <FieldLabel>Observações</FieldLabel>
          <Textarea rows={3} value={form.observacoes} onChange={e => set('observacoes', e.target.value)} />
        </Field>
      </div>

      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSave}>Salvar</Button>
      </div>
    </>
  )
}

export function ClienteFormDialog({
  open,
  onOpenChange,
  cliente,
  onSaved
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  cliente?: Cliente
  onSaved?: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className='max-h-[calc(100dvh-4rem)] gap-5 overflow-y-auto sm:max-w-2xl'>
        <FormBody key={cliente?.id ?? 'novo'} cliente={cliente} onClose={() => onOpenChange(false)} onSaved={onSaved} />
      </DialogContent>
    </Dialog>
  )
}
