'use client'

// React Imports
import { useEffect, useRef, useState } from 'react'

// Third-party Imports
import { ImageIcon, TrashIcon, UploadCloudIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const WorkspaceDetail = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      const t = window.setTimeout(() => setPreview(null), 0)

      return () => clearTimeout(t)
    }

    const url = URL.createObjectURL(file)

    const t = window.setTimeout(() => setPreview(url), 0)

    return () => {
      clearTimeout(t)
      URL.revokeObjectURL(url)
    }
  }, [file])

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]

    if (!f) return

    if (!f.type.startsWith('image/')) {
      window.alert('Selecione um arquivo de imagem')
      e.currentTarget.value = ''

      return
    }

    if (f.size > 1024 * 1024) {
      window.alert('O arquivo deve ser menor que 1MB')
      e.currentTarget.value = ''

      return
    }

    setFile(f)
  }

  const openPicker = () => inputRef.current?.click()

  const remove = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
        {/* Workspace Detail */}
        <div className='flex flex-col space-y-1'>
          <h3 className='text-base font-semibold'>Detalhe do Workspace</h3>
          <p className='text-muted-foreground text-sm'>Gerencie os detalhes e configurações do seu workspace.</p>
        </div>
        {/* Content */}
        <div className='space-y-6 lg:col-span-2'>
          {/* Workspace logo */}
          <div className='w-full space-y-2'>
            <Label>Logo do Workspace</Label>
            <div className='flex items-center gap-4'>
              <div
                role='button'
                tabIndex={0}
                aria-label='Enviar logo do workspace'
                onClick={openPicker}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openPicker()
                  }
                }}
                className='flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed hover:opacity-95'
              >
                {preview ? (
                  <img src={preview} alt='pré-visualização do logo' className='h-full w-full object-cover' />
                ) : (
                  <ImageIcon />
                )}
              </div>

              <div className='flex items-center gap-2'>
                <input ref={inputRef} type='file' accept='image/*' className='hidden' onChange={onSelect} />
                <Button variant='outline' onClick={openPicker} className='flex items-center gap-2'>
                  <UploadCloudIcon />
                  Enviar logo
                </Button>
                <Button variant='ghost' onClick={remove} disabled={!file} className='text-destructive'>
                  <TrashIcon />
                </Button>
              </div>
            </div>
            <p className='text-muted-foreground text-sm'>Escolha uma foto de até 1MB.</p>
          </div>
          {/* Workspace URl */}
          <div className='w-full space-y-2'>
            <Label htmlFor='workspace-url'>URL do Workspace</Label>
            <InputGroup>
              <InputGroupAddon className='text-foreground font-normal'>https://example.com/</InputGroupAddon>
              <InputGroupInput id='workspace-url' placeholder='sos-compressores' />
              <InputGroupAddon align='inline-end' className='text-foreground font-normal'>
                .com
              </InputGroupAddon>
            </InputGroup>
          </div>
          {/* Workspace slug */}
          <div className='w-full space-y-2'>
            <Label htmlFor='workspace-slug'>Slug do Workspace</Label>
            <Input id='workspace-slug' type='text' placeholder='sos-compressores' />
            <p className='text-muted-foreground text-xs'>
              Apenas letras minúsculas, números e hífens. Máximo de 48 caracteres
            </p>
          </div>
          {/* Workspace Description */}
          <div className='w-full space-y-2'>
            <Label htmlFor='workspace-description'>Descrição do Workspace</Label>
            <Textarea placeholder='Digite seu feedback aqui' id='workspace-description' />
          </div>
          <div className='flex justify-end'>
            <Button type='submit' className='max-sm:w-full'>
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceDetail
