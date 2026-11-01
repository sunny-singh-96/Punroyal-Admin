"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { storageUtils } from '@/lib/storage';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'super_admin';
}

export default function ProtectedRoute({ children, requiredRole = 'super_admin' }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      // Check if role-specific user exists in storage
      if (requiredRole === 'user') {
        const infUser = storageUtils.getInfluencerUser();
        const infToken = storageUtils.getInfluencerToken();
        if (infUser && infToken) {
          useAuthStore.getState().setAuth(infToken, infUser);
          return;
        }
        router.push('/influencer/login');
        return;
      } else {
        const adminUser = storageUtils.getAdminUser();
        const adminToken = storageUtils.getAdminToken();
        if (adminUser && adminToken) {
          useAuthStore.getState().setAuth(adminToken, adminUser);
          return;
        }
        router.push('/');
        return;
      }
    }

    // Role checking
    const userRole = user.role;
    if (requiredRole === 'super_admin' && userRole === 'influencer') {
      const adminUser = storageUtils.getAdminUser();
      const adminToken = storageUtils.getAdminToken();
      if (adminUser && adminToken) {
        useAuthStore.getState().setAuth(adminToken, adminUser);
        return;
      }
      router.push('/influencer/dashboard');
      return;
    }

    if (requiredRole === 'user' && (userRole === 'superadmin' || userRole === 'admin')) {
      const infUser = storageUtils.getInfluencerUser();
      const infToken = storageUtils.getInfluencerToken();
      if (infUser && infToken) {
        useAuthStore.getState().setAuth(infToken, infUser);
        return;
      }
      router.push('/dashboard');
      return;
    }
  }, [user, isLoading, router, requiredRole]);
  
  if (isLoading && requiredRole === 'super_admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="animate-spin text-blue-600 w-8 h-8 mx-auto mb-4" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
