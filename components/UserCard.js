'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Mail, Phone, Calendar, Tag, CheckCircle, XCircle } from 'lucide-react';

export default function UserCard({ user, detailed = false }) {
  const [expanded, setExpanded] = useState(false);
  
  // Determine status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'inactive':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (detailed) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
          <div className={cn("flex items-center", getStatusColor(user.status))}>
            {user.status === 'Active' ? <CheckCircle size={16} className="mr-1" /> : <XCircle size={16} className="mr-1" />}
            <span>{user.status}</span>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span>{user.contactNumber}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-700">
                <Tag className="w-5 h-5 mr-2 text-primary" />
                <span>Role: {user.role}</span>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link href="/admin/dashboard" className="text-primary hover:text-primary/80 font-medium">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden",
        expanded ? "shadow-md" : ""
      )}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-lg">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
        <div className={cn("px-2 py-1 rounded-full text-xs font-medium", 
          user.status === 'Active' ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        )}>
          {user.status}
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-2 bg-gray-50">
          <div className="flex items-center text-sm text-gray-600">
            <Phone size={14} className="mr-2 text-gray-500" />
            {user.contactNumber}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Tag size={14} className="mr-2 text-gray-500" />
            {user.role}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200">
            <Link
              href={`/admin/users/${user.id}`}
              className="inline-block px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}