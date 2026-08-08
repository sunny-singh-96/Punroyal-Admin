"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminClientWrapper from "@/components/admin/shared/AdminClientWrapper";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { validateToken, logoutUser } from "@/lib/middleware/auth";
import { Loader2 } from "lucide-react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === '/';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check token validity on route change (only on protected pages)
    if (!isLoginPage && !validateToken()) {
      console.log('🔐 No token on protected page, logging out');
      logoutUser();
    }
  }, [pathname, isLoginPage]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  // Render login page without the admin sidebar and protection
  if (isLoginPage) {
    return <>{children}</>;
  }

  // All other pages require super_admin role
  return (
    <ProtectedRoute requiredRole="super_admin">
      <AdminClientWrapper>
        {children}
        <footer className="mt-auto px-8 py-6 bg-white border-t border-slate-50 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[3px]">
            Punroyal Enterprise © 2026
          </p>
        </footer>
      </AdminClientWrapper>
    </ProtectedRoute>
  );
}
