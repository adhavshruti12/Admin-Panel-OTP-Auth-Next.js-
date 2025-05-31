import Link from 'next/link';
import { UserCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <UserCircle className="h-16 w-16 text-primary mb-4" />
      <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
      <p className="text-xl text-gray-600 mb-8">Welcome to the admin dashboard system</p>
      <Link
        href="/admin/login"
        className="px-6 py-3 bg-primary text-white rounded-md shadow-sm hover:bg-primary/90 transition-colors duration-200"
      >
        Login to Admin Panel
      </Link>
    </div>
  );
}