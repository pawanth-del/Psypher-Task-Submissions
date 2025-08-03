import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';
import { Providers } from '@/components/Providers';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tier-Based Event Showcase',
  description: 'Events based on your membership tier.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers> 
            <Navbar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
