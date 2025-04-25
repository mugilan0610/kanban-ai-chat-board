
import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex flex-col min-h-screen flex-grow">
          <header className="h-14 border-b px-4 flex items-center justify-between">
            <h1 className="font-semibold text-lg">Kanban Task Manager</h1>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-grow p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
