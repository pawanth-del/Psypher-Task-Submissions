'use client';

import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const tiers = ['free', 'silver', 'gold', 'platinum'] as const;

export function TierUpgrade() {
  const { user, isLoaded } = useUser();
  const [updating, setUpdating] = useState(false);

  if (!isLoaded || !user) return null;

  const currentTier = (user.unsafeMetadata?.tier as string) || 'free';

  const handleUpgrade = async (tier: string) => {
    setUpdating(true);
    await user.update({
      unsafeMetadata: { tier }
    });
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4 my-6">
      <span className="font-medium">Simulate Tier:</span>
      {tiers.map((tier) => (
        <button
          key={tier}
          className={`px-3 py-1 rounded ${
            tier === currentTier
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => handleUpgrade(tier)}
          disabled={updating}
        >
          {tier}
        </button>
      ))}
    </div>
  );
}
