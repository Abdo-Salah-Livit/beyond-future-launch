import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  Users,
  BookOpen,
  ClipboardList,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const adminNavItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: Home },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Courses", url: "/admin/courses", icon: BookOpen },
  { title: "Enrollments", url: "/admin/enrollments", icon: ClipboardList },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar className={cn("border-r border-sidebar-border", collapsed ? "w-14" : "w-60")} collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <h2 className={cn("font-bold text-sidebar-foreground", collapsed ? "text-sm" : "text-lg")}>
            {collapsed ? "BRS" : "BRS Admin"}
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background/95 to-primary/5">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border bg-gradient-card px-4 shadow-sm">
            <div className="flex items-center">
              <SidebarTrigger className="mr-4" />
              <h1 className="text-lg font-semibold text-card-foreground">
                Beyond Reality School - Admin Panel
              </h1>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </header>
          
          <main className="flex-1 p-6 bg-muted/30 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}