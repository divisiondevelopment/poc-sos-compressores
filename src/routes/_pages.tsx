// React Imports
import { Suspense } from 'react'

// Third-party Imports
import { createFileRoute, Outlet } from '@tanstack/react-router'

// Component Imports
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'

// Layout with sidebar and header (formerly the `(pages)` route group)
const PagesLayout = () => {
  return (
    <div className='flex h-full w-full min-w-0'>
      <Suspense>
        <Sidebar />
      </Suspense>
      <SidebarInset className='flex flex-1 flex-col'>
        <Header />
        <main className='mx-auto size-full max-w-360 flex-1 px-4 py-6 sm:px-6'>
          <Outlet />
        </main>
        <Toaster />
      </SidebarInset>
    </div>
  )
}

export const Route = createFileRoute('/_pages')({
  component: PagesLayout
})
