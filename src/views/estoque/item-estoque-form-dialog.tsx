'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowDownIcon, ArrowUpIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

// Data Imports
import {
  getStatusEstoque,
  itensEstoqueData,
  TIPOS_ITEM,
  UNIDADES,
  type ItemEstoque,
  type ItemEstoqueTipo
} from '@/fake-db/estoque/itens'

// Hook Imports
import { useSimulatedLoading } from '@/hooks/use-simulated-loading'

// Util Imports
import { cn, formatCurrencyBRL } from '@/lib/utils'

type FormState = Omit<ItemEstoque, 'id' | 'movimentacoes'>

const emptyState: FormState = {
  codigo: '',
  nome: '',
  tipo: 'Peça',
  categoria: '',
  unidade: 'un',
  quantidade: 0,
  estoqueMinimo: 1,
  estoqueMaximo: 10,
  precoMedio: 0,
  precoVenda: 0,
  localizacao: '',
  fornecedor: ''
}

const QUICK_ADJUST = [-10, -5, -1, 1, 5, 10]

function TextField({
  label,
  value,
  onChange,
  placeholder,
  className
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <Field className={cn('gap-2', className)}>
      <FieldLabel>{label}</FieldLabel>
      <Input value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </Field>
  )
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  step = 1,
  description
}: {
  label: string
  value: number
  onChange: (value: number) => void
  suffix?: string
  step?: number
  description?: string
}) {
  const update = (next: number) => onChange(Math.max(0, Number(next.toFixed(2))))

  return (
    <Field className='gap-2'>
      <FieldLabel>{label}</FieldLabel>
      <div className='flex items-center gap-1.5'>
        <Button
          type='button'
          size='icon'
          variant='outline'
          aria-label={`Diminuir ${label}`}
          onClick={() => update(value - step)}
        >
          <MinusIcon />
        </Button>
        <div className='relative flex-1'>
          <Input
            type='number'
            min={0}
            step={step}
            value={value}
            className={cn('text-center', suffix && 'pr-9')}
            onChange={e => update(Number(e.target.value))}
          />
          {suffix && (
            <span className='text-muted-foreground pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs'>
              {suffix}
            </span>
          )}
        </div>
        <Button
          type='button'
          size='icon'
          variant='outline'
          aria-label={`Aumentar ${label}`}
          onClick={() => update(value + step)}
        >
          <PlusIcon />
        </Button>
      </div>
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  )
}

function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h3 className='text-base font-semibold'>{title}</h3>
      {description && <p className='text-muted-foreground text-sm'>{description}</p>}
    </div>
  )
}

function FormSkeleton({ title }: { title: string }) {
  return (
    <>
      <div className='space-y-2 pr-10'>
        <DialogTitle className='text-lg font-semibold'>{title}</DialogTitle>
        <Skeleton className='h-4 w-56' />
      </div>
      <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]'>
        <div className='grid gap-4 sm:grid-cols-2'>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-9 w-full' />
            </div>
          ))}
        </div>
        <div className='space-y-4 max-lg:hidden'>
          <Skeleton className='h-36 w-full' />
          <Skeleton className='h-32 w-full' />
        </div>
      </div>
    </>
  )
}

function FormBody({ item, onClose, onSaved }: { item?: ItemEstoque; onClose: () => void; onSaved?: () => void }) {
  const isLoading = useSimulatedLoading(350)

  const [form, setForm] = useState<FormState>(() =>
    item
      ? {
          codigo: item.codigo,
          nome: item.nome,
          tipo: item.tipo,
          categoria: item.categoria,
          unidade: item.unidade,
          quantidade: item.quantidade,
          estoqueMinimo: item.estoqueMinimo,
          estoqueMaximo: item.estoqueMaximo,
          precoMedio: item.precoMedio,
          precoVenda: item.precoVenda,
          localizacao: item.localizacao,
          fornecedor: item.fornecedor
        }
      : emptyState
  )

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm(prev => ({ ...prev, [key]: value }))

  if (isLoading) return <FormSkeleton title={item ? item.nome : 'Novo Item'} />

  const status = getStatusEstoque(form)
  const valorEmEstoque = form.quantidade * form.precoMedio
  const margem = form.precoMedio > 0 ? ((form.precoVenda - form.precoMedio) / form.precoMedio) * 100 : 0
  const faltamParaMinimo = Math.max(form.estoqueMinimo - form.quantidade, 0)
  const sugestaoCompra = Math.max(form.estoqueMaximo - form.quantidade, 0)
  const nivel = form.estoqueMaximo > 0 ? Math.min((form.quantidade / form.estoqueMaximo) * 100, 100) : 0
  const minimoPos = form.estoqueMaximo > 0 ? Math.min((form.estoqueMinimo / form.estoqueMaximo) * 100, 100) : 0

  const barColor =
    status === 'Em estoque' ? 'bg-primary' : status === 'Estoque baixo' ? 'bg-amber-500' : 'bg-destructive'

  const diferenca = item ? form.quantidade - item.quantidade : 0

  const handleSave = () => {
    if (!form.nome.trim()) {
      toast.error('Informe o nome do item')

      return
    }

    if (form.estoqueMaximo < form.estoqueMinimo) {
      toast.error('O estoque máximo não pode ser menor que o mínimo')

      return
    }

    const hoje = format(new Date(), 'yyyy-MM-dd')

    if (item) {
      const movimentacoes =
        diferenca !== 0
          ? [
              {
                data: hoje,
                tipo: diferenca > 0 ? ('Entrada' as const) : ('Saída' as const),
                quantidade: Math.abs(diferenca),
                responsavel: 'Ajuste manual'
              },
              ...item.movimentacoes
            ]
          : item.movimentacoes

      Object.assign(item, form, { movimentacoes })
      toast.success(`Item ${form.nome} atualizado com sucesso`)
    } else {
      const numero = Math.max(0, ...itensEstoqueData.map(i => Number(i.codigo.replace(/\D/g, '')))) + 1

      itensEstoqueData.unshift({
        ...form,
        id: String(itensEstoqueData.length + 1),
        codigo: form.codigo || `PC-${numero}`,
        movimentacoes:
          form.quantidade > 0
            ? [{ data: hoje, tipo: 'Entrada', quantidade: form.quantidade, responsavel: 'Cadastro inicial' }]
            : []
      })
      toast.success(`Item ${form.nome} criado com sucesso`)
    }

    onSaved?.()
    onClose()
  }

  return (
    <>
      <div className='flex items-start justify-between gap-4 pr-10'>
        <div>
          <DialogTitle className='text-lg font-semibold'>{item ? item.nome : 'Novo Item'}</DialogTitle>
          <DialogDescription>
            {item ? `${item.codigo} · ${item.categoria}` : 'Cadastre o item e defina o estoque mínimo aceitável.'}
          </DialogDescription>
        </div>
        <StatusBadge>{status}</StatusBadge>
      </div>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]'>
        <div className='space-y-6'>
          {/* Identificação */}
          <section className='space-y-4'>
            <SectionTitle title='Identificação' />
            <Field className='gap-2'>
              <FieldLabel>Tipo do item</FieldLabel>
              <div className='flex flex-wrap gap-2'>
                {TIPOS_ITEM.map(tipo => (
                  <Button
                    key={tipo}
                    type='button'
                    size='sm'
                    variant={form.tipo === tipo ? 'default' : 'outline'}
                    onClick={() => set('tipo', tipo as ItemEstoqueTipo)}
                  >
                    {tipo}
                  </Button>
                ))}
              </div>
            </Field>
            <div className='grid gap-4 sm:grid-cols-2'>
              <TextField
                className='sm:col-span-2'
                label='Nome do item*'
                value={form.nome}
                onChange={v => set('nome', v)}
              />
              <TextField
                label='Código'
                value={form.codigo}
                placeholder='Gerado automaticamente'
                onChange={v => set('codigo', v)}
              />
              <TextField label='Categoria' value={form.categoria} onChange={v => set('categoria', v)} />
              <Field className='gap-2'>
                <FieldLabel>Unidade de medida</FieldLabel>
                <Select value={form.unidade} onValueChange={val => set('unidade', val ?? 'un')}>
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIDADES.map(u => (
                      <SelectItem key={u} value={u}>
                        {u}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <TextField
                label='Localização'
                value={form.localizacao}
                placeholder='Galpão · Prateleira'
                onChange={v => set('localizacao', v)}
              />
              <TextField
                className='sm:col-span-2'
                label='Fornecedor principal'
                value={form.fornecedor}
                onChange={v => set('fornecedor', v)}
              />
            </div>
          </section>

          <Separator />

          {/* Estoque */}
          <section className='space-y-4'>
            <SectionTitle title='Estoque' description='Use os botões para ajustar a quantidade sem digitar.' />
            <NumberField
              label='Quantidade atual'
              value={form.quantidade}
              suffix={form.unidade}
              onChange={v => set('quantidade', v)}
            />
            <div className='flex flex-wrap gap-2'>
              {QUICK_ADJUST.map(delta => (
                <Button
                  key={delta}
                  type='button'
                  size='sm'
                  variant='outline'
                  onClick={() => set('quantidade', Math.max(0, form.quantidade + delta))}
                >
                  {delta > 0 ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {delta > 0 ? `+${delta}` : delta}
                </Button>
              ))}
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <NumberField
                label='Estoque mínimo aceitável'
                value={form.estoqueMinimo}
                suffix={form.unidade}
                onChange={v => set('estoqueMinimo', v)}
                description='Abaixo ou igual a isso o item aparece como "Estoque baixo".'
              />
              <NumberField
                label='Estoque máximo'
                value={form.estoqueMaximo}
                suffix={form.unidade}
                onChange={v => set('estoqueMaximo', v)}
                description='Usado para sugerir a quantidade de compra.'
              />
            </div>
          </section>

          <Separator />

          {/* Preços */}
          <section className='space-y-4'>
            <SectionTitle title='Preços' />
            <div className='grid gap-4 sm:grid-cols-2'>
              <NumberField
                label='Preço médio de custo (R$)'
                step={5}
                value={form.precoMedio}
                onChange={v => set('precoMedio', v)}
              />
              <NumberField
                label='Preço de venda (R$)'
                step={5}
                value={form.precoVenda}
                onChange={v => set('precoVenda', v)}
              />
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className='bg-muted/30 h-fit space-y-5 rounded-xl border p-4'>
          <div className='space-y-3'>
            <h3 className='text-sm font-semibold'>Nível de estoque</h3>
            <div className='relative'>
              <div className='bg-muted h-3 overflow-hidden rounded-full'>
                <div className={cn('h-full rounded-full transition-all', barColor)} style={{ width: `${nivel}%` }} />
              </div>
              <div
                className='bg-foreground/60 absolute -top-1 h-5 w-0.5'
                style={{ left: `${minimoPos}%` }}
                title='Estoque mínimo'
              />
            </div>
            <div className='text-muted-foreground flex justify-between text-xs'>
              <span>0</span>
              <span>mín. {form.estoqueMinimo}</span>
              <span>
                máx. {form.estoqueMaximo} {form.unidade}
              </span>
            </div>
          </div>

          <Separator />

          <div className='space-y-2 text-sm'>
            {[
              ['Quantidade', `${form.quantidade} ${form.unidade}`],
              ['Valor em estoque', formatCurrencyBRL(valorEmEstoque)],
              ['Margem', `${margem.toFixed(1).replace('.', ',')}%`],
              ['Faltam p/ o mínimo', `${faltamParaMinimo} ${form.unidade}`],
              ['Sugestão de compra', `${sugestaoCompra} ${form.unidade}`]
            ].map(([label, value]) => (
              <div key={label} className='flex justify-between gap-4'>
                <span className='text-muted-foreground'>{label}</span>
                <span className='font-medium'>{value}</span>
              </div>
            ))}
            {diferenca !== 0 && (
              <p className='text-xs text-amber-600'>
                Ajuste de {diferenca > 0 ? '+' : ''}
                {diferenca} {form.unidade} será registrado ao salvar.
              </p>
            )}
          </div>

          {item && (
            <>
              <Separator />
              <div className='space-y-2'>
                <h3 className='text-sm font-semibold'>Últimas movimentações</h3>
                {item.movimentacoes.length ? (
                  <ul className='space-y-2 text-sm'>
                    {item.movimentacoes.slice(0, 4).map((m, i) => (
                      <li key={i} className='flex items-center justify-between gap-2'>
                        <span>
                          {m.tipo === 'Saída' ? '−' : '+'}
                          {m.quantidade} <span className='text-muted-foreground'>{m.tipo}</span>
                        </span>
                        <span className='text-muted-foreground text-xs'>
                          {format(new Date(`${m.data}T00:00:00`), 'dd MMM', { locale: ptBR })}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-muted-foreground text-sm'>Sem movimentações.</p>
                )}
              </div>
            </>
          )}
        </aside>
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

export function ItemEstoqueFormDialog({
  open,
  onOpenChange,
  item,
  onSaved
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: ItemEstoque
  onSaved?: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className='max-h-[calc(100dvh-3rem)] gap-5 overflow-y-auto sm:max-w-4xl'>
        <FormBody key={item?.id ?? 'novo'} item={item} onClose={() => onOpenChange(false)} onSaved={onSaved} />
      </DialogContent>
    </Dialog>
  )
}
