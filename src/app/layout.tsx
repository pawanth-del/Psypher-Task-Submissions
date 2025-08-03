import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar'; // ✅ import

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tier-Based Event Showcase',
  description: 'Events based on your membership tier.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar /> {/* ✅ show Navbar on every page */}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
