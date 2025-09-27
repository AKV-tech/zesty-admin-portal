import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';
import { SidebarTrigger } from '@/components/ui/sidebar';

const AdminLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="h-16 flex items-center justify-between px-6 border-b bg-card">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <AdminTopbar />
          </div>
        </header>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;