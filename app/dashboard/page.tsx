export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="سیم‌کارت‌های فعال" value="۱۲,۴۵۰" color="bg-blue-500" />
        <StatCard title="درآمد این ماه" value="۴۵۰,۰۰۰,۰۰۰ ﷼" color="bg-emerald-500" />
        <StatCard title="مشتریان جدید" value="۳۴۲" color="bg-purple-500" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">نمای کلی فعالیت‌ها</h3>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
          [نمودار فعالیت‌ها در اینجا قرار می‌گیرد]
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex relative overflow-hidden group">
      <div className={`absolute right-0 top-0 bottom-0 w-1 ${color} transition-all group-hover:w-2`}></div>
      <div className="pr-4">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
    </div>
  );
}