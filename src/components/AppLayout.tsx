
import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollArea } from "./ui/scroll-area";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 border-b px-4 flex items-center justify-between shrink-0">
            <h1 className="font-semibold text-lg">Kanban Task Manager</h1>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </header>
          <ScrollArea className="flex-1">
            <main className="p-6">{children}</main>
          </ScrollArea>
        </div>
      </div>
    </SidebarProvider>
  );
}
