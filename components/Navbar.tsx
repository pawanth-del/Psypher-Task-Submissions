'use client';

import { UserButton, useUser, SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';

const tierColors = {
  free: 'bg-gray-200 text-gray-800',
  silver: 'bg-blue-200 text-blue-800',
  gold: 'bg-yellow-200 text-yellow-800',
  platinum: 'bg-purple-200 text-purple-800',
} as const;

export default function Navbar() {
  const { user, isLoaded } = useUser();

  const userTier = isLoaded
    ? (user?.unsafeMetadata?.tier as keyof typeof tierColors) || 'free'
    : 'free';

  return (
    <nav className="bg-white border-b shadow-sm px-4 py-3 sticky top-0 z-50 transition-all duration-300">

      <div className="max-w-7xl mx-auto flex items-center justify-between">
       
        <Link href="/" className="text-xl font-bold text-blue-600">
          EventList 
        </Link>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Tier badge */}
            {userTier && (
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-xl ${tierColors[userTier]}`}
              >
                TIER: {userTier.toUpperCase()}
              </span>
            )}

            {/* User dropdown */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
