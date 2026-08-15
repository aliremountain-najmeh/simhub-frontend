// app/dashboard/finance/page.tsx
'use client';

import { Wallet, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';

export default function FinancePage() {
  // داده‌های فرضی برای نمایش رابط کاربری (باید به apiClient متصل شود)
  const transactions = [
    { id: 'TRX-101', type: 'DEPOSIT', amount: 50000000, date: '۱۴۰۲/۰۸/۱۲ - ۱۰:۳۰', status: 'SUCCESS' },
    { id: 'TRX-102', type: 'WITHDRAW', amount: 12000000, date: '۱۴۰۲/۰۸/۱۱ - ۱۴:۱۵', status: 'PENDING' },
    { id: 'TRX-103', type: 'DEPOSIT', amount: 35000000, date: '۱۴۰۲/۰۸/۱۰ - ۰۹:۰۰', status: 'SUCCESS' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">امور مالی و کیف پول</h2>
          <p className="text-sm text-gray-500 mt-1">مدیریت تراکنش‌ها، برداشت‌ها و موجودی حساب</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
          <Wallet size={18} />
          <span>درخواست تسویه حساب</span>
        </button>
      </div>

      {/* کارت‌های خلاصه مالی */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
          <Wallet className="absolute -left-4 -bottom-4 text-white/20 w-32 h-32" />
          <p className="text-blue-100 text-sm font-medium relative z-10">موجودی قابل برداشت</p>
          <h3 className="text-3xl font-bold mt-2 relative z-10">۲۴۵,۰۰۰,۰۰۰ <span className="text-lg font-normal">ریال</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg"><ArrowDownLeft size={20} /></div>
            <p className="text-sm font-medium text-gray-600">مجموع واریزی‌ها (این ماه)</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">۸۹۰,۰۰۰,۰۰۰ <span className="text-sm font-normal text-gray-500">ریال</span></h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 text-orange-500 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg"><Clock size={20} /></div>
            <p className="text-sm font-medium text-gray-600">تسویه‌های در انتظار</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">۱۲,۰۰۰,۰۰۰ <span className="text-sm font-normal text-gray-500">ریال</span></h3>
        </div>
      </div>

      {/* تاریخچه تراکنش‌ها */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <h3 className="font-semibold text-gray-800">تاریخچه تراکنش‌ها</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${trx.type === 'DEPOSIT' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                        {trx.type === 'DEPOSIT' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{trx.type === 'DEPOSIT' ? 'واریز به حساب' : 'برداشت از حساب'}</p>
                        <p className="text-xs text-gray-500 font-mono mt-1">{trx.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500" dir="ltr">{trx.date}</td>
                  <td className={`px-6 py-4 text-sm font-bold ${trx.type === 'DEPOSIT' ? 'text-emerald-600' : 'text-gray-900'}`}>
                    {trx.type === 'DEPOSIT' ? '+' : '-'}{trx.amount.toLocaleString()} ریال
                  </td>
                  <td className="px-6 py-4 text-left">
                    {trx.status === 'SUCCESS' 
                      ? <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">موفق</span>
                      : <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">در انتظار</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}