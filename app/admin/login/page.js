'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { sendOtp, verifyOtp, ADMIN_CONTACT, DEFAULT_OTP, isAuthenticated } from '@/lib/auth';
import OtpInput from '@/components/OtpInput';
import { PhoneCall, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const [contactNumber, setContactNumber] = useState(ADMIN_CONTACT);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { setAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (contactNumber !== ADMIN_CONTACT) {
        throw new Error('Invalid admin contact number');
      }
      
      const response = await sendOtp(contactNumber);
      if (response.success) {
        setOtpSent(true);
        setSuccess('OTP sent successfully! For this demo, use: ' + DEFAULT_OTP);
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    setError('');

    try {
      const response = await verifyOtp(contactNumber, otp);
      if (response.success) {
        setAuthenticated(true);
        setSuccess('Login successful!');
        router.push('/admin/dashboard');
      } else {
        setError(response.message || 'Invalid OTP');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-600 mt-1">Enter your credentials to access the dashboard</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}
        
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneCall className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contactNumber"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Enter your contact number"
                  required
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">Demo: Use admin number 7710957578</p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Enter the 4-digit OTP sent to your phone
              </label>
              <OtpInput length={4} onComplete={handleVerifyOtp} />
              <p className="mt-2 text-xs text-gray-500">Demo: Use OTP 7710</p>
            </div>
            
            {loading && (
              <div className="flex justify-center">
                <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></span>
              </div>
            )}
            
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="w-full text-primary hover:text-primary/80 text-center py-2"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}