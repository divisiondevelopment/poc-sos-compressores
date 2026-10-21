'use client'

// React Imports
import { useState } from 'react'

// Third-party Imports
import { PlusIcon } from 'lucide-react'

// Component Imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const SocialUrl = () => {
  const [urls, setUrls] = useState<string[]>(['', '', ''])

  const addUrl = () => setUrls(prev => [...prev, ''])

  const updateUrl = (index: number, value: string) => setUrls(prev => prev.map((u, i) => (i === index ? value : u)))

  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-3'>
      {/* Vertical Tabs List */}
      <div className='flex flex-col'>
        <h3 className='text-base font-semibold'>URLs de Redes Sociais</h3>
        <p className='text-muted-foreground text-sm'>Gerencie suas URLs de redes sociais.</p>
      </div>

      {/* Content */}
      <div className='space-y-6 lg:col-span-2'>
        <div className='space-y-4'>
          {urls.map((url, idx) => (
            <Input
              key={idx}
              type='text'
              placeholder='Link para o perfil social'
              value={url}
              onChange={e => updateUrl(idx, e.target.value)}
            />
          ))}
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Button type='button' variant='outline' onClick={addUrl}>
            <PlusIcon className='size-4' />
            Adicionar URL
          </Button>
          <Button type='submit'>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  )
}

export default SocialUrl
