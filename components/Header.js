'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const { authenticated, logout } = useAuth();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href={authenticated ? '/admin/dashboard' : '/admin/login'} className="flex items-center">
              <UserCircle className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-semibold text-gray-900">Admin Panel</span>
            </Link>
          </div>
          
          {authenticated && (
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}