'use client'

// Type Imports
import type { Email } from '@/types/apps/mail-types'

// Component Imports
import { MailDisplayContent } from './mail-display-content'

export interface MailDisplayProps {
  email: Email | null
}

export const MailDisplay = ({ email }: MailDisplayProps) => {
  if (!email) {
    return (
      <div className='text-muted-foreground flex h-full flex-col items-center justify-center gap-2 p-10 text-center'>
        <p className='text-foreground text-sm font-medium'>Nenhuma mensagem selecionada</p>
        <p className='text-xs'>Escolha um e-mail da lista para lê-lo aqui.</p>
      </div>
    )
  }

  return <MailDisplayContent key={email.id} email={email} />
}

export default MailDisplay
