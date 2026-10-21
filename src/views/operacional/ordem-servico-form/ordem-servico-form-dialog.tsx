'use client'

// React Imports
import { useEffect, useMemo, useRef, useState } from 'react'

// Third-party Imports
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MapPinIcon, PhoneIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

// Component Imports
import { StatusBadge } from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { ClienteFormDialog } from '@/views/clientes/cliente-form-dialog'

// Data Imports
import { clientesData, getClienteByNome } from '@/fake-db/cadastros/clientes'
import {
  ordensServicoData,
  type OrdemServico,
  type OrdemServicoItem,
  type OrdemServicoStatus
} from '@/fake-db/operacional/ordens-servico'

// Hook Imports
import { useSimulatedLoading } from '@/hooks/use-simulated-loading'

// Util Imports
import { cn } from '@/lib/utils'

const STATUS_OPTIONS: OrdemServicoStatus[] = ['Aberta', 'Em andamento', 'Concluída', 'Cancelada']
const PRIORIDADES = ['Baixa', 'Normal', 'Alta', 'Urgente']
const TIPOS_SERVICO = ['Manutenção corretiva', 'Manutenção preventiva', 'Instalação', 'Diagnóstico', 'Garantia']
const ORIGENS = ['Telefone', 'WhatsApp', 'E-mail', 'Balcão', 'Visita técnica']
const TECNICOS = ['Carlos Eduardo Santos', 'Paulo Henrique Souza']

const SECTIONS = [
  { id: 'capa', label: 'Capa' },
  { id: 'equipamento', label: 'Equipamento' },
  { id: 'itens', label: 'Itens e Serviços' },
  { id: 'observacoes', label: 'Observações' }
] as const

type FormState = {
  cliente: string
  status: OrdemServicoStatus
  prioridade: string
  tipoServico: string
  origem: string
  tecnico: string
  dataAbertura: string
  previsaoEntrega: string
  equipamento: string
  marca: string
  modelo: string
  numeroSerie: string
  placa: string
  horimetro: string
  defeito: string
  itens: OrdemServicoItem[]
  diagnostico: string
  observacoes: string
}

const today = () => format(new Date(), 'yyyy-MM-dd')

const brl = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const emptyItem = (): OrdemServicoItem => ({ id: crypto.randomUUID(), descricao: '', quantidade: 1, valorUnitario: 0 })

function buildInitialState(ordem?: OrdemServico): FormState {
  return {
    cliente: ordem?.cliente ?? '',
    status: ordem?.status ?? 'Aberta',
    prioridade: 'Normal',
    tipoServico: 'Manutenção corretiva',
    origem: 'Telefone',
    tecnico: ordem?.tecnico ?? '',
    dataAbertura: ordem?.data ?? today(),
    previsaoEntrega: '',
    equipamento: ordem?.equipamento ?? '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    placa: '',
    horimetro: '',
    defeito: '',
    itens: ordem?.itens.map(i => ({ ...i })) ?? [emptyItem()],
    diagnostico: '',
    observacoes: ''
  }
}

function SectionTitle({ id, title, description }: { id: string; title: string; description?: string }) {
  return (
    <div id={`os-${id}`} className='scroll-mt-4'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      {description && <p className='text-muted-foreground text-sm'>{description}</p>}
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
}) {
  return (
    <Field className='gap-2'>
      <FieldLabel>{label}</FieldLabel>
      <Select value={value} onValueChange={val => onChange(val ?? '')}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder ?? 'Selecione'} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <Field className='gap-2'>
      <FieldLabel>{label}</FieldLabel>
      <Input type={type} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </Field>
  )
}

// Shows a brief loading state each time a different record is opened
function useSimulatedLoadingKey(key: string | undefined, delayMs = 350) {
  const [state, setState] = useState<{ key?: string; loading: boolean }>({ key, loading: !!key })

  if (state.key !== key) setState({ key, loading: !!key })

  useEffect(() => {
    if (!key) return

    const timer = setTimeout(() => setState(prev => (prev.key === key ? { ...prev, loading: false } : prev)), delayMs)

    return () => clearTimeout(timer)
  }, [key, delayMs])

  return state.loading
}

function OrdemServicoViewDialog({
  ordem,
  onOpenChange,
  onEdit
}: {
  ordem: OrdemServico | null
  onOpenChange: (open: boolean) => void
  onEdit: (ordem: OrdemServico) => void
}) {
  const [last, setLast] = useState<OrdemServico | null>(ordem)

  // Keep the last OS rendered while the closing animation runs
  if (ordem && ordem !== last) setLast(ordem)

  const shown = ordem ?? last
  const isLoading = useSimulatedLoadingKey(ordem?.id)
  const total = shown?.itens.reduce((sum, i) => sum + i.quantidade * i.valorUnitario, 0) ?? 0

  return (
    <Dialog open={!!ordem} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[calc(100dvh-4rem)] gap-5 overflow-y-auto sm:max-w-xl'>
        {shown && isLoading && (
          <>
            <DialogTitle className='text-lg font-semibold'>{shown.codigo}</DialogTitle>
            <Skeleton className='h-4 w-56' />
            <Skeleton className='h-16 w-full' />
            <Skeleton className='h-32 w-full' />
            <Skeleton className='h-20 w-full' />
          </>
        )}
        {shown && !isLoading && (
          <>
            <div className='flex items-center gap-3 pr-10'>
              <DialogTitle className='text-lg font-semibold'>{shown.codigo}</DialogTitle>
              <StatusBadge>{shown.status}</StatusBadge>
            </div>
            <DialogDescription className='-mt-3'>
              {shown.cliente} · {format(new Date(`${shown.data}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })}
            </DialogDescription>

            <div className='space-y-2 text-sm'>
              {[
                ['Equipamento', shown.equipamento],
                ['Técnico', shown.tecnico]
              ].map(([label, value]) => (
                <div key={label} className='flex justify-between gap-4'>
                  <span className='text-muted-foreground'>{label}</span>
                  <span className='font-medium'>{value}</span>
                </div>
              ))}
            </div>

            <div className='space-y-2'>
              <h3 className='text-sm font-semibold'>Itens e Serviços</h3>
              <div className='divide-y rounded-lg border text-sm'>
                {shown.itens.map(item => (
                  <div key={item.id} className='flex items-center justify-between gap-4 p-3'>
                    <span>
                      {item.descricao}
                      <span className='text-muted-foreground'> × {item.quantidade}</span>
                    </span>
                    <span className='font-medium'>{brl(item.quantidade * item.valorUnitario)}</span>
                  </div>
                ))}
                <div className='flex justify-between p-3 font-semibold'>
                  <span>Total</span>
                  <span>{brl(total)}</span>
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <h3 className='text-sm font-semibold'>Histórico</h3>
              <ul className='space-y-2 text-sm'>
                {shown.historico.map((h, index) => (
                  <li key={index} className='flex items-start justify-between gap-4'>
                    <span>
                      {h.status}
                      {h.observacao && <span className='text-muted-foreground'> — {h.observacao}</span>}
                    </span>
                    <span className='text-muted-foreground shrink-0 text-xs'>
                      {format(new Date(`${h.data}T00:00:00`), 'dd/MM/yyyy')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex justify-end gap-2'>
              <Button variant='outline' onClick={() => onOpenChange(false)}>
                Fechar
              </Button>
              <Button onClick={() => onEdit(shown)}>Editar</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function FormSkeleton({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <>
      <div className='flex items-center justify-between gap-4 border-b px-6 py-4'>
        <div className='space-y-2'>
          <DialogTitle className='text-xl font-semibold'>{title}</DialogTitle>
          <Skeleton className='h-4 w-72' />
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={onClose}>
            Cancelar
          </Button>
          <Skeleton className='h-9 w-20' />
        </div>
      </div>

      <div className='grid min-h-0 grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)_340px]'>
        <div className='hidden space-y-2 border-r p-4 lg:block'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className='h-9 w-full' />
          ))}
        </div>
        <div className='space-y-4 p-6'>
          <Skeleton className='h-6 w-40' />
          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-9 w-full' />
              </div>
            ))}
          </div>
          <Skeleton className='h-24 w-full' />
        </div>
        <div className='bg-muted/30 space-y-4 border-l p-5 max-lg:hidden'>
          <Skeleton className='h-40 w-full' />
          <Skeleton className='h-24 w-full' />
          <Skeleton className='h-32 w-full' />
        </div>
      </div>
    </>
  )
}

function FormBody({
  ordem,
  onClose,
  onSaved,
  onOpenOrdem
}: {
  ordem?: OrdemServico
  onClose: () => void
  onSaved?: () => void
  onOpenOrdem: (ordem: OrdemServico) => void
}) {
  const isLoading = useSimulatedLoading(450)
  const [form, setForm] = useState<FormState>(() => buildInitialState(ordem))
  const [activeSection, setActiveSection] = useState<string>('capa')
  const [clienteOpen, setClienteOpen] = useState(false)
  const [, setClienteVersion] = useState(0)
  const [viewing, setViewing] = useState<OrdemServico | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm(prev => ({ ...prev, [key]: value }))

  const cliente = getClienteByNome(form.cliente)

  const ultimasOs = useMemo(
    () =>
      ordensServicoData
        .filter(o => o.cliente === form.cliente && o.id !== ordem?.id)
        .sort((a, b) => b.data.localeCompare(a.data))
        .slice(0, 4),
    [form.cliente, ordem?.id]
  )

  const total = form.itens.reduce((sum, item) => sum + item.quantidade * item.valorUnitario, 0)
  const itensPreenchidos = form.itens.filter(i => i.descricao.trim()).length

  const goTo = (id: string) => {
    setActiveSection(id)
    scrollRef.current?.querySelector(`#os-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const updateItem = (id: string, patch: Partial<OrdemServicoItem>) =>
    set(
      'itens',
      form.itens.map(i => (i.id === id ? { ...i, ...patch } : i))
    )

  const handleSave = () => {
    if (!form.cliente) {
      toast.error('Selecione o cliente da ordem de serviço')
      goTo('capa')

      return
    }

    const itens = form.itens.filter(i => i.descricao.trim())

    const dados = {
      cliente: form.cliente,
      equipamento: form.equipamento,
      data: form.dataAbertura,
      status: form.status,
      tecnico: form.tecnico,
      clienteContato: cliente?.telefone ?? '',
      clienteEndereco: cliente ? `${cliente.endereco} - ${cliente.cidade}` : '',
      itens
    }

    if (ordem) {
      // Edit: update the record in place and stay on the current screen
      Object.assign(ordem, dados)
      toast.success(`Ordem de serviço ${ordem.codigo} atualizada com sucesso`)
      onSaved?.()
      onClose()

      return
    }

    // Create: register the OS so it shows up in the list
    const numero = Math.max(...ordensServicoData.map(o => Number(o.codigo.replace(/\D/g, '')))) + 1

    const nova: OrdemServico = {
      ...dados,
      id: String(ordensServicoData.length + 1),
      codigo: `OS-${numero}`,
      historico: [{ data: dados.data, status: dados.status, observacao: 'Ordem de serviço registrada' }]
    }

    ordensServicoData.unshift(nova)
    toast.success(`Ordem de serviço ${nova.codigo} criada com sucesso`)
    onSaved?.()
    onClose()
  }

  if (isLoading) {
    return (
      <FormSkeleton title={ordem ? `Ordem de Serviço ${ordem.codigo}` : 'Nova Ordem de Serviço'} onClose={onClose} />
    )
  }

  return (
    <>
      {/* Header */}
      <div className='flex items-center justify-between gap-4 border-b px-6 py-4'>
        <div>
          <DialogTitle className='text-xl font-semibold'>
            {ordem ? `Ordem de Serviço ${ordem.codigo}` : 'Nova Ordem de Serviço'}
          </DialogTitle>
          <DialogDescription>Preencha tudo em uma única tela, sem precisar navegar entre páginas.</DialogDescription>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>

      <div className='grid min-h-0 grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)_340px]'>
        {/* Section nav */}
        <nav className='hidden flex-col gap-1 border-r p-4 lg:flex'>
          <p className='text-muted-foreground mb-2 px-2 text-xs font-medium uppercase'>Seções</p>
          {SECTIONS.map(section => (
            <button
              key={section.id}
              type='button'
              onClick={() => goTo(section.id)}
              className={cn(
                'hover:bg-muted rounded-md px-3 py-2 text-left text-sm transition-colors',
                activeSection === section.id && 'bg-primary/10 text-primary font-medium'
              )}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Form */}
        <div ref={scrollRef} className='min-h-0 space-y-10 overflow-y-auto p-6'>
          <section className='space-y-4'>
            <SectionTitle id='capa' title='Capa' description='Dados principais da ordem de serviço.' />
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              <Field className='gap-2 sm:col-span-2 xl:col-span-1'>
                <FieldLabel>Cliente*</FieldLabel>
                <Select value={form.cliente} onValueChange={val => set('cliente', val ?? '')}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecione o cliente' />
                  </SelectTrigger>
                  <SelectContent>
                    {clientesData.map(c => (
                      <SelectItem key={c.nome} value={c.nome}>
                        {c.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <SelectField
                label='Status'
                value={form.status}
                options={STATUS_OPTIONS}
                onChange={v => set('status', v as OrdemServicoStatus)}
              />
              <SelectField
                label='Prioridade'
                value={form.prioridade}
                options={PRIORIDADES}
                onChange={v => set('prioridade', v)}
              />
              <SelectField
                label='Tipo de serviço'
                value={form.tipoServico}
                options={TIPOS_SERVICO}
                onChange={v => set('tipoServico', v)}
              />
              <SelectField
                label='Origem do chamado'
                value={form.origem}
                options={ORIGENS}
                onChange={v => set('origem', v)}
              />
              <SelectField
                label='Técnico responsável'
                value={form.tecnico}
                options={TECNICOS}
                onChange={v => set('tecnico', v)}
              />
              <TextField
                label='Data de abertura'
                type='date'
                value={form.dataAbertura}
                onChange={v => set('dataAbertura', v)}
              />
              <TextField
                label='Previsão de entrega'
                type='date'
                value={form.previsaoEntrega}
                onChange={v => set('previsaoEntrega', v)}
              />
            </div>
          </section>

          <Separator />

          <section className='space-y-4'>
            <SectionTitle
              id='equipamento'
              title='Equipamento'
              description='Identificação do compressor e do defeito relatado.'
            />
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              <TextField
                label='Equipamento'
                value={form.equipamento}
                placeholder='Ex.: Compressor Parafuso 50HP'
                onChange={v => set('equipamento', v)}
              />
              <TextField label='Marca' value={form.marca} onChange={v => set('marca', v)} />
              <TextField label='Modelo' value={form.modelo} onChange={v => set('modelo', v)} />
              <TextField label='Nº de série' value={form.numeroSerie} onChange={v => set('numeroSerie', v)} />
              <TextField label='Placa / Veículo' value={form.placa} onChange={v => set('placa', v)} />
              <TextField
                label='Horímetro (h)'
                type='number'
                value={form.horimetro}
                onChange={v => set('horimetro', v)}
              />
            </div>
            <Field className='gap-2'>
              <FieldLabel>Defeito relatado pelo cliente</FieldLabel>
              <Textarea rows={3} value={form.defeito} onChange={e => set('defeito', e.target.value)} />
            </Field>
          </section>

          <Separator />

          <section className='space-y-4'>
            <SectionTitle id='itens' title='Itens e Serviços' description='Peças e mão de obra utilizadas.' />
            <div className='space-y-2'>
              <div className='text-muted-foreground hidden grid-cols-[minmax(0,1fr)_80px_120px_110px_36px] gap-2 px-1 text-xs sm:grid'>
                <span>Descrição</span>
                <span>Qtd.</span>
                <span>Valor unit.</span>
                <span className='text-right'>Subtotal</span>
                <span />
              </div>
              {form.itens.map(item => (
                <div
                  key={item.id}
                  className='grid grid-cols-[minmax(0,1fr)_80px_120px_110px_36px] items-center gap-2 max-sm:grid-cols-2'
                >
                  <Input
                    value={item.descricao}
                    placeholder='Descrição do item ou serviço'
                    className='max-sm:col-span-2'
                    onChange={e => updateItem(item.id, { descricao: e.target.value })}
                  />
                  <Input
                    type='number'
                    min={1}
                    value={item.quantidade}
                    onChange={e => updateItem(item.id, { quantidade: Number(e.target.value) })}
                  />
                  <Input
                    type='number'
                    min={0}
                    value={item.valorUnitario}
                    onChange={e => updateItem(item.id, { valorUnitario: Number(e.target.value) })}
                  />
                  <span className='text-right text-sm font-medium'>{brl(item.quantidade * item.valorUnitario)}</span>
                  <Button
                    type='button'
                    size='icon-sm'
                    variant='ghost'
                    aria-label='Remover item'
                    disabled={form.itens.length === 1}
                    onClick={() =>
                      set(
                        'itens',
                        form.itens.filter(i => i.id !== item.id)
                      )
                    }
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))}
            </div>
            <div className='flex items-center justify-between'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => set('itens', [...form.itens, emptyItem()])}
              >
                <PlusIcon /> Adicionar item
              </Button>
              <p className='text-sm'>
                Total: <span className='text-base font-semibold'>{brl(total)}</span>
              </p>
            </div>
          </section>

          <Separator />

          <section className='space-y-4'>
            <SectionTitle id='observacoes' title='Observações' />
            <Field className='gap-2'>
              <FieldLabel>Diagnóstico técnico</FieldLabel>
              <Textarea rows={3} value={form.diagnostico} onChange={e => set('diagnostico', e.target.value)} />
            </Field>
            <Field className='gap-2'>
              <FieldLabel>Observações internas</FieldLabel>
              <Textarea rows={3} value={form.observacoes} onChange={e => set('observacoes', e.target.value)} />
            </Field>
          </section>
        </div>

        {/* Summary panel */}
        <aside className='bg-muted/30 min-h-0 space-y-6 overflow-y-auto border-l p-5 max-lg:hidden'>
          <div className='space-y-3'>
            <h3 className='text-sm font-semibold'>Resumo da OS</h3>
            <div className='bg-card space-y-2 rounded-lg border p-4 text-sm'>
              <div className='flex items-center justify-between'>
                <span className='font-semibold'>{ordem?.codigo ?? 'Nova OS'}</span>
                <StatusBadge>{form.status}</StatusBadge>
              </div>
              <Separator />
              {[
                ['Tipo', form.tipoServico],
                ['Prioridade', form.prioridade],
                ['Técnico', form.tecnico || '—'],
                ['Equipamento', form.equipamento || '—'],
                [
                  'Previsão',
                  form.previsaoEntrega
                    ? format(new Date(`${form.previsaoEntrega}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })
                    : '—'
                ],
                ['Itens', String(itensPreenchidos)]
              ].map(([label, value]) => (
                <div key={label} className='flex justify-between gap-4'>
                  <span className='text-muted-foreground'>{label}</span>
                  <span className='truncate text-right font-medium'>{value}</span>
                </div>
              ))}
              <Separator />
              <div className='flex justify-between text-base font-semibold'>
                <span>Total</span>
                <span>{brl(total)}</span>
              </div>
            </div>
          </div>

          <div className='space-y-3'>
            <h3 className='text-sm font-semibold'>Cliente</h3>
            <div className='bg-card space-y-2 rounded-lg border p-4 text-sm'>
              {cliente ? (
                <>
                  <button
                    type='button'
                    onClick={() => setClienteOpen(true)}
                    className='text-primary text-left font-medium hover:underline'
                  >
                    {cliente.nome}
                  </button>
                  <div className='text-muted-foreground flex items-center gap-2'>
                    <PhoneIcon className='size-4 shrink-0' />
                    <span>{cliente.telefone}</span>
                  </div>
                  <div className='text-muted-foreground flex items-start gap-2'>
                    <MapPinIcon className='mt-0.5 size-4 shrink-0' />
                    <span>
                      {cliente.endereco} - {cliente.cidade}
                    </span>
                  </div>
                </>
              ) : (
                <p className='text-muted-foreground'>Selecione um cliente na capa.</p>
              )}
            </div>
          </div>

          <div className='space-y-3'>
            <h3 className='text-sm font-semibold'>Últimas OS do cliente</h3>
            <div className='bg-card divide-y rounded-lg border text-sm'>
              {ultimasOs.length ? (
                ultimasOs.map(o => (
                  <button
                    key={o.id}
                    type='button'
                    onClick={() => setViewing(o)}
                    className='hover:bg-muted/60 block w-full space-y-1 p-3 text-left transition-colors'
                  >
                    <div className='flex items-center justify-between'>
                      <span className='font-medium'>{o.codigo}</span>
                      <StatusBadge>{o.status}</StatusBadge>
                    </div>
                    <p className='text-muted-foreground truncate'>{o.equipamento}</p>
                    <p className='text-muted-foreground text-xs'>
                      {format(new Date(`${o.data}T00:00:00`), 'dd MMM yyyy', { locale: ptBR })}
                    </p>
                  </button>
                ))
              ) : (
                <p className='text-muted-foreground p-3'>Nenhuma OS anterior.</p>
              )}
            </div>
          </div>
        </aside>
      </div>

      <OrdemServicoViewDialog
        ordem={viewing}
        onOpenChange={open => !open && setViewing(null)}
        onEdit={o => onOpenOrdem(o)}
      />
      <ClienteFormDialog
        open={clienteOpen}
        onOpenChange={setClienteOpen}
        cliente={cliente}
        onSaved={() => setClienteVersion(v => v + 1)}
      />
    </>
  )
}

export function OrdemServicoFormDialog({
  open,
  onOpenChange,
  ordem,
  onSaved
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  ordem?: OrdemServico
  onSaved?: () => void
}) {
  // OS opened from inside the dialog (e.g. from "Últimas OS do cliente") replaces the one being shown
  const [switched, setSwitched] = useState<OrdemServico | undefined>()
  const current = switched ?? ordem

  const handleOpenChange = (next: boolean) => {
    if (!next) setSwitched(undefined)
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className='h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden p-0 sm:max-w-[min(1400px,calc(100%-2rem))]'
      >
        {/* Remount on open so the form always starts from the selected OS */}
        <FormBody
          key={current?.id ?? 'nova'}
          ordem={current}
          onSaved={onSaved}
          onOpenOrdem={setSwitched}
          onClose={() => handleOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
