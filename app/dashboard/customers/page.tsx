'use client';

import { useState } from 'react';
import { Users, Search, Plus, CheckCircle, Clock } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface Customer {
  id: string;
  fullName: string;
  nationalId: string;
  phone: string;
  kycStatus: 'VERIFIED' | 'PENDING';
  registerDate: string;
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', nationalId: '', phone: '' });

  const [customers] = useState<Customer[]>([
    { id: 'C-01', fullName: 'علی محمدی', nationalId: '0012345678', phone: '09121112233', kycStatus: 'VERIFIED', registerDate: '۱۴۰۲/۰۸/۱۰' },
    { id: 'C-02', fullName: 'سارا احمدی', nationalId: '0459876543', phone: '09350001122', kycStatus: 'PENDING', registerDate: '۱۴۰۲/۰۸/۱۲' },
    { id: 'C-03', fullName: 'رضا حسینی', nationalId: '1234567890', phone: '09198887766', kycStatus: 'VERIFIED', registerDate: '۱۴۰۲/۰۸/۰۵' },
  ]);

  const handleRegisterCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ارسال به بک‌اند:', formData);
    setIsModalOpen(false);
    setFormData({ fullName: '', nationalId: '', phone: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">مدیریت مشتریان و KYC</h2>
          <p className="text-sm text-gray-500 mt-1">بررسی وضعیت احراز هویت و ثبت مشتریان جدید</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>ثبت مشتری جدید</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative max-w-md">
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="جستجوی کد ملی یا نام مشتری..."
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">نام و نام خانوادگی</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">کد ملی</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">شماره تماس</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">وضعیت KYC</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">تاریخ ثبت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                      {customer.fullName.charAt(0)}
                    </div>
                    {customer.fullName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{customer.nationalId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono" dir="ltr">{customer.phone}</td>
                  <td className="px-6 py-4">
                    {customer.kycStatus === 'VERIFIED' ? (
                      <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        <CheckCircle size={14} /> تایید شده
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 w-fit px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        <Clock size={14} /> در انتظار تایید
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{customer.registerDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="ثبت مشتری جدید (KYC)"
      >
        <form onSubmit={handleRegisterCustomer} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">کد ملی (۱۰ رقم)</label>
            <input 
              type="text" 
              required
              pattern="\d{10}"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-left"
              value={formData.nationalId}
              onChange={(e) => setFormData({...formData, nationalId: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
            <input 
              type="tel" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono text-left"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="09..."
            />
          </div>
          <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              انصراف
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              ثبت موقت و ارسال به KYC
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}