'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import {
  Archive,
  ChevronDown,
  Forward,
  Inbox,
  MoreVertical,
  Reply,
  ReplyAll,
  SendIcon,
  ShieldAlert,
  ShieldCheck,
  StarIcon,
  Trash2
} from 'lucide-react'

// Type Imports
import type { Email, ThreadMessage } from '@/types/apps/mail-types'

// Component Imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { LabelManager } from './label-manager'
import { MailThreadMessage } from './mail-thread-message'

// Config Imports
import { formatMailDate, getInitialsFromName, MAIL_CURRENT_USER, MAIL_LABEL_STYLES } from '@/configs/mailConfig'

// Util Imports
import { cn } from '@/lib/utils'

const LABEL_MANAGE_STATUSES = new Set<Email['status']>(['inbox', 'sent', 'archive'])

export const MailDisplayContent = ({ email }: { email: Email }) => {
  // States
  const [replyMessageBody, setReplyMessageBody] = useState(() => (email.status === 'drafts' ? email.body : ''))
  const [isEarlierMessagesExpanded, setIsEarlierMessagesExpanded] = useState(false)

  // Vars
  const threadMessages = email.thread.messages
  const earlierThreadMessages = threadMessages.slice(0, -1)
  const latestThreadMessage = threadMessages[threadMessages.length - 1]
  const earlierMessageCount = earlierThreadMessages.length

  const isDraft = email.status === 'drafts'
  const isSent = email.status === 'sent'
  const canManageLabels = LABEL_MANAGE_STATUSES.has(email.status)

  const recipientName = isSent || isDraft ? (email.to ?? 'Desconhecido') : email.from
  const recipientEmail = isSent || isDraft ? (email.toEmail ?? '') : email.fromEmail

  const getThreadMessageAvatar = (message: ThreadMessage) => {
    if (message.isFromMe) {
      return MAIL_CURRENT_USER.avatar
    }

    if (message.from === email.from) {
      return email.avatar
    }

    return undefined
  }

  return (
    <div className='flex h-full min-h-0 flex-col'>
      <div className='flex items-center gap-1 p-1 max-lg:justify-end lg:h-15 lg:p-3'>
        <div className='hidden items-center lg:flex'>
          {(email.status === 'inbox' || email.status === 'sent' || email.status === 'drafts') && (
            <Tooltip>
              <TooltipTrigger render={<Button variant='ghost' size='icon' title='Arquivar' />}>
                <Archive className='size-4' />
                <span className='sr-only'>Arquivar</span>
              </TooltipTrigger>
              <TooltipContent>Arquivar</TooltipContent>
            </Tooltip>
          )}

          {email.status === 'inbox' && (
            <Tooltip>
              <TooltipTrigger render={<Button variant='ghost' size='icon' title='Mover para spam' />}>
                <ShieldAlert className='size-4' />
                <span className='sr-only'>Mover para spam</span>
              </TooltipTrigger>
              <TooltipContent>Mover para spam</TooltipContent>
            </Tooltip>
          )}

          {email.status === 'spam' && (
            <Tooltip>
              <TooltipTrigger render={<Button variant='ghost' size='icon' title='Não é spam' />}>
                <ShieldCheck className='size-4' />
                <span className='sr-only'>Não é spam</span>
              </TooltipTrigger>
              <TooltipContent>Não é spam</TooltipContent>
            </Tooltip>
          )}

          {(email.status === 'trash' || email.status === 'archive') && (
            <Tooltip>
              <TooltipTrigger render={<Button variant='ghost' size='icon' title='Restaurar para a caixa de entrada' />}>
                <Inbox className='size-4' />
                <span className='sr-only'>Restaurar para a caixa de entrada</span>
              </TooltipTrigger>
              <TooltipContent>Restaurar para a caixa de entrada</TooltipContent>
            </Tooltip>
          )}

          {(email.status === 'inbox' ||
            email.status === 'sent' ||
            email.status === 'drafts' ||
            email.status === 'spam' ||
            email.status === 'archive') && (
            <Tooltip>
              <TooltipTrigger render={<Button variant='ghost' size='icon' title='Mover para a lixeira' />}>
                <Trash2 className='size-4' />
                <span className='sr-only'>Mover para a lixeira</span>
              </TooltipTrigger>
              <TooltipContent>Mover para a lixeira</TooltipContent>
            </Tooltip>
          )}

          {(email.status === 'spam' || email.status === 'trash') && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant='ghost'
                    size='icon'
                    title='Excluir permanentemente'
                    className='text-destructive hover:text-destructive'
                  />
                }
              >
                <Trash2 className='size-4' />
                <span className='sr-only'>Excluir permanentemente</span>
              </TooltipTrigger>
              <TooltipContent>Excluir permanentemente</TooltipContent>
            </Tooltip>
          )}

          {canManageLabels && <LabelManager labels={email.labels} />}
        </div>

        <Separator orientation='vertical' className='hidden h-6 data-vertical:self-center lg:block' />
        <div className='hidden min-w-0 flex-1 items-center gap-2 lg:flex'>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant='ghost'
                  size='icon'
                  title={email.isStarred ? 'Remover estrela' : 'Marcar com estrela'}
                />
              }
            >
              <StarIcon className={cn('size-4', email.isStarred && 'fill-primary text-primary')} />
              <span className='sr-only'>{email.isStarred ? 'Remover estrela' : 'Marcar com estrela'}</span>
            </TooltipTrigger>
            <TooltipContent>{email.isStarred ? 'Remover estrela' : 'Marcar com estrela'}</TooltipContent>
          </Tooltip>
          {email.labels.length > 0 && (
            <div className='flex min-w-0 flex-wrap items-center gap-1.5'>
              {email.labels.map(label => {
                const labelStyle = MAIL_LABEL_STYLES.find(style => style.id === label)

                return (
                  <Badge key={label} variant='outline' className='px-1.5 max-xl:border-0 max-xl:p-0'>
                    <span className={cn('size-1.5 shrink-0 rounded-full', labelStyle?.color)} />
                    <span className='max-xl:hidden'>{label}</span>
                  </Badge>
                )
              })}
            </div>
          )}
        </div>

        <div className='flex shrink-0 items-center gap-0.5'>
          <Tooltip>
            <TooltipTrigger render={<Button variant='ghost' size='icon' disabled={isSent} />}>
              <Reply className='size-4' />
              <span className='sr-only'>Responder</span>
            </TooltipTrigger>
            <TooltipContent>Responder</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant='ghost' size='icon' disabled={!email} />}>
              <ReplyAll className='size-4' />
              <span className='sr-only'>Responder a todos</span>
            </TooltipTrigger>
            <TooltipContent>Responder a todos</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<Button variant='ghost' size='icon' disabled={!email} />}>
              <Forward className='size-4' />
              <span className='sr-only'>Encaminhar</span>
            </TooltipTrigger>
            <TooltipContent>Encaminhar</TooltipContent>
          </Tooltip>
          <Separator orientation='vertical' className='mx-1 h-6 data-vertical:self-center' />
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant='ghost' size='icon' />}>
              <MoreVertical className='size-4' />
              <span className='sr-only'>Mais</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>{email.isRead ? 'Marcar como não lida' : 'Marcar como lida'}</DropdownMenuItem>
              <DropdownMenuItem>
                {email.isStarred ? 'Remover estrela da conversa' : 'Marcar conversa com estrela'}
              </DropdownMenuItem>
              {(email.status === 'inbox' || email.status === 'sent' || email.status === 'drafts') && (
                <DropdownMenuItem>Arquivar</DropdownMenuItem>
              )}
              {email.status === 'inbox' && <DropdownMenuItem>Mover para spam</DropdownMenuItem>}
              {email.status === 'spam' && <DropdownMenuItem>Não é spam</DropdownMenuItem>}
              {(email.status === 'trash' || email.status === 'archive') && (
                <DropdownMenuItem>Restaurar para a caixa de entrada</DropdownMenuItem>
              )}
              {email.status === 'drafts' && <DropdownMenuItem>Enviar rascunho</DropdownMenuItem>}
              {(email.status === 'inbox' ||
                email.status === 'sent' ||
                email.status === 'drafts' ||
                email.status === 'spam' ||
                email.status === 'archive') && (
                <DropdownMenuItem variant='destructive'>Mover para a lixeira</DropdownMenuItem>
              )}
              {(email.status === 'spam' || email.status === 'trash') && (
                <DropdownMenuItem variant='destructive'>Excluir permanentemente</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />

      <div className='flex min-h-0 flex-1 flex-col overflow-hidden'>
        <div className='border-border border-b p-3'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex min-w-0 flex-1 items-start gap-3'>
              <Avatar size='lg' className='shrink-0 max-md:hidden'>
                {!isSent && !isDraft && <AvatarImage src={email.avatar} alt={email.from} />}
                <AvatarFallback>{getInitialsFromName(recipientName)}</AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <h2 className='text-foreground line-clamp-2 text-base leading-snug font-medium tracking-tight md:font-semibold'>
                  {email.subject}
                </h2>
                {isSent || isDraft ? (
                  <>
                    <p className='text-foreground mt-1 text-sm font-medium'>
                      <span className='text-muted-foreground font-normal'>Para: </span>
                      {recipientName}
                    </p>
                    {recipientEmail && <p className='text-muted-foreground mt-0.5 text-xs'>{recipientEmail}</p>}
                  </>
                ) : (
                  <>
                    <p className='text-foreground mt-1 text-sm font-medium'>{email.from}</p>
                    <p className='text-muted-foreground mt-0.5 text-xs'>Responder a: {email.fromEmail}</p>
                  </>
                )}
              </div>
            </div>
            <span className='text-muted-foreground shrink-0 pt-0.5 text-xs'>{formatMailDate(email.date)}</span>
          </div>
        </div>

        <div className='flex-1 overflow-auto p-3'>
          <div className='flex flex-col gap-5'>
            {earlierMessageCount > 0 && (
              <button
                type='button'
                className='text-muted-foreground hover:text-foreground flex w-full items-center gap-2 text-sm font-medium transition-colors'
                onClick={() => setIsEarlierMessagesExpanded(currentValue => !currentValue)}
              >
                <ChevronDown className={cn('size-4 transition-transform', isEarlierMessagesExpanded && 'rotate-180')} />
                {earlierMessageCount} {earlierMessageCount === 1 ? 'mensagem anterior' : 'mensagens anteriores'}
              </button>
            )}

            {isEarlierMessagesExpanded &&
              earlierThreadMessages.map(threadMessage => (
                <MailThreadMessage
                  key={threadMessage.id}
                  message={threadMessage}
                  avatar={getThreadMessageAvatar(threadMessage)}
                />
              ))}

            {latestThreadMessage && (
              <MailThreadMessage
                message={latestThreadMessage}
                avatar={getThreadMessageAvatar(latestThreadMessage)}
                variant='plain'
              />
            )}
          </div>
        </div>

        <div className='border-border mt-auto border-t p-3'>
          <form onSubmit={event => event.preventDefault()}>
            <div className='border-border bg-muted/20 overflow-hidden rounded-lg border'>
              <Textarea
                className='resize-none rounded-none border-0 bg-transparent p-2 text-sm shadow-none focus-visible:ring-0 max-md:min-h-10 md:px-4 md:py-3'
                placeholder={isDraft ? 'Edite seu rascunho...' : `Responder a ${recipientName}...`}
                value={replyMessageBody}
                onChange={event => setReplyMessageBody(event.target.value)}
              />
              <div className='border-border flex items-center justify-between border-t p-2 md:px-4 md:py-2.5'>
                <div className='flex items-center gap-2'>
                  <Switch id='mute-thread' />
                  <label htmlFor='mute-thread' className='text-muted-foreground text-sm'>
                    Silenciar esta conversa
                  </label>
                </div>
                <Button
                  type='submit'
                  variant='secondary'
                  size='sm'
                  title={isDraft ? 'Enviar rascunho' : 'Enviar resposta'}
                  className='gap-1.5 rounded-lg px-4'
                  disabled={!replyMessageBody.trim()}
                >
                  Enviar
                  <SendIcon className='size-4' />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
