"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { storageUtils } from '@/lib/storage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'super_admin';
}

export default function ProtectedRoute({ children, requiredRole = 'super_admin' }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const loginPath = requiredRole === 'user' ? '/influencer/login' : '/';

    if (requiredRole === 'user') {
      const infUser = storageUtils.getInfluencerUser();
      const infToken = storageUtils.getInfluencerToken();
      if (!infUser || !infToken || infUser.role !== 'influencer') {
        setAuthorized(false);
        router.replace(loginPath);
        return;
      }
      if (!user || user.role !== 'influencer') {
        useAuthStore.getState().setAuth(infToken, infUser);
      }
      setAuthorized(true);
      return;
    }

    const adminUser = storageUtils.getAdminUser();
    const adminToken = storageUtils.getAdminToken();
    const isAdmin = adminUser && (adminUser.role === 'superadmin' || adminUser.role === 'admin');

    if (!adminToken || !isAdmin) {
      setAuthorized(false);
      router.replace(loginPath);
      return;
    }

    if (!user || (user.role !== 'superadmin' && user.role !== 'admin')) {
      useAuthStore.getState().setAuth(adminToken, adminUser);
    }
    setAuthorized(true);
  }, [user, isLoading, router, requiredRole]);

  // Never flash "Loading dashboard..." or protected children when unauthenticated
  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
