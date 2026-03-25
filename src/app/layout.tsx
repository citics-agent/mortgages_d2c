import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font',
});

export const metadata: Metadata = {
  title: 'Citics Mortgages — La Bàn Cho Vay Thế Chấp Bất Động Sản',
  description:
    'Citics Mortgages kết nối hồ sơ vay thế chấp của bạn với ngân hàng phù hợp, tăng khả năng phê duyệt và tiết kiệm thời gian chuẩn bị thủ tục.',
  icons: {
    icon: '/assets/C-Ribbon2-noshadow.svg',
  },
  other: {
    'theme-color': '#0741DA',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="debug-grid">{children}</body>
    </html>
  );
}
