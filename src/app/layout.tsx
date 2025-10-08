import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Student Resource Manager - Organize Your Study Materials',
  description: 'A comprehensive platform for students to store, organize, and manage their study materials including notes, assignments, and useful links with secure authentication.',
  keywords: 'student, study, resources, notes, assignments, education, learning',
  authors: [{ name: 'Manit Gera' }],
  openGraph: {
    title: 'Student Resource Manager',
    description: 'Organize your study materials efficiently',
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}