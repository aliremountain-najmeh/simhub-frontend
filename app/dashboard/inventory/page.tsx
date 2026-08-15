// app/dashboard/inventory/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Plus } from 'lucide-react';
import apiClient from '@/lib/apiClient';

// تعریف تایپ برای سیم‌کارت
interface SimCard {
  id: string;
  iccid: string;
  phoneNumber: string;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  price: number;
}

export default function InventoryPage() {
  const [simCards, setSimCards] = useState<SimCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // دریافت داده‌ها از بک‌اند (با فرض وجود روت /inventory)
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await apiClient.get('/inventory');
        setSimCards(response.data);
      } catch (error) {
        console.error('خطا در دریافت موجودی:', error);
        // داده‌های تستی برای نمایش در صورت در دسترس نبودن بک‌اند
        setSimCards([
          { id: '1', iccid: '8998910000000000001', phoneNumber: '09123456789', status: 'AVAILABLE', price: 1500000 },
          { id: '2', iccid: '8998910000000000002', phoneNumber: '09129876543', status: 'RESERVED', price: 2000000 },
          { id: '3', iccid: '8998910000000000003', phoneNumber: '09121112233', status: 'SOLD', price: 1200000 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">موجود</span>;
      case 'RESERVED': return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">رزرو شده</span>;
      case 'SOLD': return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">فروخته شده</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* هدر صفحه و دکمه‌ها */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">مدیریت موجودی سیم‌کارت‌ها</h2>
          <p className="text-sm text-gray-500 mt-1">مشاهده و مدیریت وضعیت سیم‌کارت‌های سیستم</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>افزودن سیم‌کارت جدید</span>
        </button>
      </div>

      {/* نوار ابزار (جستجو و فیلتر) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="جستجوی ICCID یا شماره تماس..."
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">
          <Filter size={18} />
          <span>فیلتر وضعیت</span>
        </button>
      </div>

      {/* جدول داده‌ها (Data Table) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">شماره ICCID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">شماره تماس</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">وضعیت</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">قیمت (ریال)</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">در حال بارگذاری اطلاعات...</td></tr>
              ) : simCards.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">هیچ سیم‌کارتی یافت نشد.</td></tr>
              ) : (
                simCards.map((sim) => (
                  <tr key={sim.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 font-mono">{sim.iccid}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-mono" dir="ltr">{sim.phoneNumber}</td>
                    <td className="px-6 py-4">{getStatusBadge(sim.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{sim.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}