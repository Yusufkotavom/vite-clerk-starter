import { Outlet } from '@tanstack/react-router'
import { getCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SkipToMain } from '@/components/skip-to-main'
import { useAppStore } from '@/stores/app-store'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

function TaskInspector() {
  const { isInspectorOpen, selectedTaskId, setSelectedTask } = useAppStore()

  if (!isInspectorOpen) return null

  return (
    <div className="w-80 border-l bg-background h-svh flex flex-col flex-shrink-0 transition-all duration-300">
      <div className="h-14 border-b flex items-center justify-between px-4">
        <h3 className="font-semibold text-sm">Inspector</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedTask(null)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {selectedTaskId ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Task ID: {selectedTaskId}</p>
            {/* TODO: Inspector Form will go here */}
            <p className="text-sm">Select a project, defer date, due date, etc.</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center mt-10">No task selected.</p>
        )}
      </div>
    </div>
  )
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  
  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          
          <div className="flex flex-1 w-full overflow-hidden">
            <SidebarInset
              className={cn(
                // Set content container, so we can use container queries
                '@container/content flex-1 min-w-0 overflow-hidden',

                // If layout is fixed, set the height
                // to 100svh to prevent overflow
                'has-data-[layout=fixed]:h-svh',

                // If layout is fixed and sidebar is inset,
                // set the height to 100svh - spacing (total margins) to prevent overflow
                'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
              )}
            >
              {children ?? <Outlet />}
            </SidebarInset>
            
            <TaskInspector />
          </div>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
