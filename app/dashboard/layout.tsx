import { LayoutDashboard, Smartphone, Wallet, Users, LogOut } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

export const metadata = {
  title: 'داشبورد | SIMHub',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden text-gray-900">
      <aside className="w-64 bg-white border-l border-gray-200 shadow-sm flex flex-col justify-between">
        <div>
          <div className="h-16 flex items-center justify-center border-b border-gray-100">
            <h2 className="text-xl font-bold text-blue-600 tracking-wide">SIMHub Admin</h2>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="داشبورد اصلی" />
            <NavItem href="/dashboard/inventory" icon={<Smartphone size={20} />} label="مدیریت موجودی" />
            <NavItem href="/dashboard/finance" icon={<Wallet size={20} />} label="امور مالی" />
            <NavItem href="/dashboard/customers" icon={<Users size={20} />} label="مشتریان" />
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <button className="flex w-full items-center space-x-2 space-x-reverse px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium">
            <LogOut size={20} />
            <span>خروج از سیستم</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-lg font-medium text-gray-700">سیستم مدیریت یکپارچه</h1>
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-sm text-gray-500">مدیر سیستم (ادمین)</span>
            <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
              M
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link href={href}>
      <div className="flex items-center space-x-3 space-x-reverse px-3 py-2.5 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}