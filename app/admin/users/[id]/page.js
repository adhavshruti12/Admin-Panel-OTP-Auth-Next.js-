'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, AlertTriangle } from 'lucide-react';
import UserCard from '@/components/UserCard';
import { fetchUserById } from '@/lib/auth';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notAuth, setNotAuth] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await fetchUserById(params.id);
        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        if (err.message === 'No authentication token found') {
          setNotAuth(true);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [params.id]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (notAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertTriangle className="h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-lg font-medium text-red-800">Not Authenticated</h3>
        <Link href="/admin/login" className="mt-4 text-primary underline">
          Go to Login
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">User not found</h3>
        <p className="mt-1 text-sm text-gray-500">
          The user you're looking for doesn't exist or you don't have permission to view it.
        </p>
        <Link href="/admin/dashboard" className="mt-4 text-primary underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link href="/admin/dashboard" className="flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">User Details</h1>
      </div>
      <UserCard user={user} detailed />
    </div>
  );
}