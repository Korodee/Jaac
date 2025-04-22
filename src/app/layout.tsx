import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CustomCursor from '@/components/layout/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JAAC - Psychological Support Services',
  description: 'Professional psychological support and counseling services for individuals and businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
