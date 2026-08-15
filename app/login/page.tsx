'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await apiClient.post('/auth/login', formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'نام کاربری یا رمز عبور اشتباه است.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 bg-[url('/bg-pattern.svg')] bg-cover">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">ورود به سیستم</h1>
          <p className="text-sm text-gray-500 mt-2">نرم‌افزار مدیریت یکپارچه SIMHub</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-none pr-3">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              required
              className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all"
              placeholder="نام کاربری"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-none pr-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              required
              className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 transition-all"
              placeholder="رمز عبور"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'در حال احراز هویت...' : 'ورود امن'}
          </button>
        </form>
      </div>
    </div>
  );
}