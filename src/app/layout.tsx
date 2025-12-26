// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'School Name - Excellence in Education',
  description: 'Nurturing minds, shaping futures. Join our community of learners.',
  keywords: 'school, education, learning, academics, admission',
  openGraph: {
    title: 'School Name - Excellence in Education',
    description: 'Nurturing minds, shaping futures',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}