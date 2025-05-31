import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';

export const metadata = {
  title: 'Admin Panel',
  description: 'Admin panel with OTP authentication',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}