// Config Imports
import themeConfig from '@/configs/themeConfig'

// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img src='/images/logo.png' alt={themeConfig.templateName} className='size-8.5 object-contain' />
      <span className='text-xl font-bold'>{themeConfig.templateName}</span>
    </div>
  )
}

export default Logo
