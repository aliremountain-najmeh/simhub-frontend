/** @type {import('next').NextConfig} */
const nextConfig = {
  // خروجی standalone برای کاهش حجم و بهینه‌سازی داکر
  output: 'standalone',
  // غیرفعال کردن هدرهای تبلیغاتی برای امنیت بیشتر
  poweredByHeader: false,
};

module.exports = nextConfig;