"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'super_admin';
}

export default function ProtectedRoute({ children, requiredRole = 'super_admin' }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    console.log('🔐 ProtectedRoute check - user:', user, 'isLoading:', isLoading);
    
    if (isLoading) {
      console.log('⏳ Still loading user...');
      return;
    }

    if (!user) {
      console.log('❌ No user found, redirecting to login');
      router.push('/');
      return;
    }

    console.log('✅ User authenticated, allowing access');

    // Role checking
    const userRole = user.role;
    if (requiredRole === 'super_admin' && userRole === 'influencer') {
      router.push('/influencer/dashboard');
      return;
    }
    if (requiredRole === 'user' && (userRole === 'superadmin' || userRole === 'admin')) {
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