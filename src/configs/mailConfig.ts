// Third-party Imports
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Type Imports
import type { EmailLabel, EmailStatus } from '@/types/apps/mail-types'

export const MAIL_CURRENT_USER = {
  name: 'Você',
  email: 'you@example.com',
  avatar: undefined as string | undefined
}

export type MailNavStatusItem = {
  id: EmailStatus
  label: string
}

export type MailNavLabelItem = {
  id: EmailLabel
  label: string
}

export type MailNavLabelStyle = MailNavLabelItem & {
  color: string
}

export type MailNavStatusItemWithCount = MailNavStatusItem & {
  count: number
}

export type MailNavLabelItemWithCount = MailNavLabelItem & {
  count: number
}

export const MAIL_STATUS_NAV_ITEMS: MailNavStatusItem[] = [
  { id: 'inbox', label: 'Caixa de Entrada' },
  { id: 'drafts', label: 'Rascunhos' },
  { id: 'sent', label: 'Enviados' },
  { id: 'spam', label: 'Spam' },
  { id: 'trash', label: 'Lixeira' },
  { id: 'archive', label: 'Arquivo' }
]

export const MAIL_LABEL_NAV_ITEMS: MailNavLabelItem[] = [
  { id: 'social', label: 'Social' },
  { id: 'updates', label: 'Atualizações' },
  { id: 'forums', label: 'Fóruns' },
  { id: 'shopping', label: 'Compras' },
  { id: 'promotions', label: 'Promoções' }
]

export const MAIL_LABEL_STYLES: MailNavLabelStyle[] = [
  { id: 'social', label: 'Social', color: 'bg-violet-500' },
  { id: 'updates', label: 'Atualizações', color: 'bg-teal-500' },
  { id: 'forums', label: 'Fóruns', color: 'bg-orange-500' },
  { id: 'shopping', label: 'Compras', color: 'bg-lime-500' },
  { id: 'promotions', label: 'Promoções', color: 'bg-pink-500' }
]

export const getInitialsFromName = (name: string) => {
  return name
    .split(' ')
    .map(namePart => namePart[0])
    .join('')
}

export const formatMailDate = (date: Date) => {
  const diffMs = Date.now() - date.getTime()

  if (diffMs < 60_000) {
    return 'Agora mesmo'
  }

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
  }

  if (isYesterday(date)) {
    return 'Ontem'
  }

  return format(date, 'd MMM', { locale: ptBR })
}
