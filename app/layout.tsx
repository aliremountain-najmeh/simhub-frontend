import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SIMHub | سیستم یکپارچه مدیریت سیم‌کارت',
  description: 'نرم‌افزار سازمانی، امن و هوشمند برای مدیریت اکوسیستم سیم‌کارت',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}