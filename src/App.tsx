import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import Login from "./pages/admin/Login";
import AdminLayout from "./components/layout/AdminLayout";
import Assets from "./pages/admin/Assets";
import Scenes from "./pages/admin/Scenes";
import QR from "./pages/admin/QR";
import Analytics from "./pages/admin/Analytics";
import Account from "./pages/admin/Account";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <SidebarProvider>
                <AdminLayout />
              </SidebarProvider>
            }>
              <Route index element={<Navigate to="/admin/assets" replace />} />
              <Route path="assets" element={<Assets />} />
              <Route path="scenes" element={<Scenes />} />
              <Route path="qr" element={<QR />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;