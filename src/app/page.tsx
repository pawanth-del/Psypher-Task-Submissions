'use client';

import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl text-center space-y-6"
      >
        <h1 className="text-4xl font-bold text-gray-800">Welcome to EventList App</h1>
        <p className="text-gray-600 text-lg">
          View exclusive events based on your tier. Login or sign up to get started.
        </p>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Sign In / Sign Up
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <Link
            href="/events"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            View My Events
          </Link>
          <div className="mt-3">
            <UserButton />
          </div>
        </SignedIn>
      </motion.div>
    </main>
  );
}
