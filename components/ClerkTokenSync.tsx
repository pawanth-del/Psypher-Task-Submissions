'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TierUpgrade } from '@/components/TierUpgrade';

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  image_url: string;
  tier: 'free' | 'silver' | 'gold' | 'platinum';
};

const tierOrder = ['free', 'silver', 'gold', 'platinum'] as const;

const tierColors: Record<Event['tier'], string> = {
  free: 'bg-gray-200 text-gray-800',
  silver: 'bg-blue-200 text-blue-800',
  gold: 'bg-yellow-200 text-yellow-800',
  platinum: 'bg-purple-200 text-purple-800',
};

export default function EventsPage() {
  const { user, isLoaded } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [userTier, setUserTier] = useState<Event['tier'] | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const tier = user.unsafeMetadata?.tier as Event['tier'] | undefined;

    if (!tier || !tierOrder.includes(tier)) {
      console.warn('Tier not set or invalid in Clerk metadata');
      return;
    }

    setUserTier(tier);

    const allowedTiers = tierOrder.slice(0, tierOrder.indexOf(tier) + 1);

    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('tier', allowedTiers);

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    };

    fetchEvents();
  }, [isLoaded, user]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Your Tier Events</h1>

      {/* Tier badge */}
      {userTier && (
        <div className="text-center mt-2">
          <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded ${tierColors[userTier]}`}
          >
            Current Tier: {userTier.toUpperCase()}
          </span>
        </div>
      )}

      <TierUpgrade />

      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="rounded-xl shadow-md border overflow-hidden">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-2">
                <span
                  className={`inline-block text-xs px-2 py-1 rounded ${tierColors[event.tier]}`}
                >
                  {event.tier.toUpperCase()}
                </span>
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500">
                  📅 {new Date(event.event_date).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
