import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CustomCursor from '@/components/layout/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JAAC - Services de Soutien Psychologique',
  description: 'Services professionnels de soutien psychologique et de counseling pour les particuliers et les entreprises.',
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
