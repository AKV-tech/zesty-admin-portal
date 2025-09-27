import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  FolderOpen,
  Video,
  QrCode,
  BarChart3,
  User,
  Layers3
} from 'lucide-react';

const navigationItems = [
  { title: 'Assets', url: '/admin/assets', icon: FolderOpen },
  { title: 'Scenes', url: '/admin/scenes', icon: Layers3 },
  { title: 'QR Codes', url: '/admin/qr', icon: QrCode },
  { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
  { title: 'Account', url: '/admin/account', icon: User },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      className="transition-smooth border-r"
      collapsible="icon"
    >
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Video className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-foreground">AR Admin</h2>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={isCollapsed ? item.title : undefined}
                    >
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 w-full transition-smooth ${
                          isActive
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}