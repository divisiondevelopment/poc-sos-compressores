// Third-party Imports
import { createRootRoute, Outlet } from '@tanstack/react-router'

import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'

// Component Imports
import Providers from '@/components/Providers'
import NotFound from '@/components/layout/NotFound'
import ScrollToTop from '@/components/layout/ScrollToTop'
import { TooltipProvider } from '@/components/ui/tooltip'

const RootLayout = () => {
  return (
    <NuqsAdapter>
      <Providers sidebarDefaultOpen={true}>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </Providers>

      <ScrollToTop />
    </NuqsAdapter>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound
})
