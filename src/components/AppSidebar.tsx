
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { BarChart3, LogIn, Plus, Settings, Layout, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function AppSidebar() {
  const isLoggedIn = false; // Will be replaced with actual auth state

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-2">
          <Layout className="h-6 w-6 text-primary" />
          <span className="font-bold">Kanban</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        {isLoggedIn ? (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Boards</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/boards">
                        <Layout className="h-4 w-4" />
                        <span>All Boards</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/boards/new">
                        <Plus className="h-4 w-4" />
                        <span>Create Board</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Statistics</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>User Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/profile">
                        <UserCog className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <div className="p-4">
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button className="w-full" variant="outline">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-border/50 p-4">
        <div className="text-xs text-muted-foreground text-center">
          Kanban Task Manager v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
