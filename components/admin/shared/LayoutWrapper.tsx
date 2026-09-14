"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminClientWrapper from "@/components/admin/shared/AdminClientWrapper";
import InfluencerClientWrapper from "@/components/influencer/shared/InfluencerClientWrapper";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { validateToken, logoutUser } from "@/lib/middleware/auth";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  const { user } = useAuthStore();

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

  const isInfluencer = user?.role === 'influencer';
  const isProductViewPage = pathname.startsWith('/products/view');
  const isInfluencerPage = pathname.startsWith('/influencer') || (isInfluencer && isProductViewPage);

  return (
    <ProtectedRoute requiredRole={isInfluencerPage ? "user" : "super_admin"}>
      {isInfluencerPage ? (
        <InfluencerClientWrapper>
          {children}
          <footer className="mt-auto px-8 py-6 bg-white border-t border-slate-50 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[3px]">
              Punroyal Creator © 2026
            </p>
          </footer>
        </InfluencerClientWrapper>
      ) : (
        <AdminClientWrapper>
          {children}
          <footer className="mt-auto px-8 py-6 bg-white border-t border-slate-50 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[3px]">
              Punroyal Enterprise © 2026
            </p>
          </footer>
        </AdminClientWrapper>
      )}
    </ProtectedRoute>
  );
}
