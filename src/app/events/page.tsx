'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { TierUpgrade } from '@/components/TierUpgrade';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

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
  const { user } = useUser();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const userTier = (user?.publicMetadata?.tier as Event['tier']) || 'free';

  useEffect(() => {
    if (!user) return;

    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) console.error('Error fetching events:', error.message);
      else setEvents(data || []);
      setLoading(false);
    };

    fetchEvents();
  }, [user]);

  const filteredEvents =
    selectedTier === 'all'
      ? events
      : events.filter((event) => event.tier === selectedTier);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Your Tier Events</h1>

        {/* User Tier Badge */}
        <div className="flex justify-center mb-4">
          <span className={`px-4 py-1 rounded-full font-medium text-sm ${tierColors[userTier]}`}>
            Current Tier: {userTier.toUpperCase()}
          </span>
        </div>

        <TierUpgrade />

        {/* Tier Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['all', ...tierOrder].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTier === tier
                  ? 'bg-black text-white'
                  : 'bg-white border text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tier === 'all' ? 'All Tiers' : tier.toUpperCase()}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading events...</p>
        ) : (
          tierOrder.map((tier) => {
            const tierEvents = filteredEvents.filter((e) => e.tier === tier);
            if (tierEvents.length === 0) return null;

            return (
              <section key={tier} className="mb-12">
                <div className="sticky top-0 bg-slate-100/90 z-10 backdrop-blur py-2">
                  <h2
                    className={`text-xl font-semibold ${tierColors[tier]} inline-block px-4 py-1 rounded`}
                  >
                    {tier.toUpperCase()} Tier Events
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {tierEvents.map((event, index) => {
                    const isLocked =
                      tierOrder.indexOf(event.tier) > tierOrder.indexOf(userTier);

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => !isLocked && setSelectedEvent(event)}
                        className={`relative cursor-pointer flex flex-col h-full rounded-2xl overflow-hidden border bg-white transition-all duration-300 ${
                          isLocked
                            ? 'opacity-50 pointer-events-none'
                            : 'shadow-md hover:shadow-2xl'
                        }`}
                      >
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4 space-y-2 flex flex-col flex-grow">
                          <span
                            className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${tierColors[event.tier]}`}
                          >
                            {event.tier.toUpperCase()}
                          </span>
                          <h2 className="text-lg font-bold text-gray-800">{event.title}</h2>
                          <p className="text-sm text-gray-600 flex-grow line-clamp-2">
                            {event.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            📅 {new Date(event.event_date).toLocaleString()}
                          </p>
                        </div>

                        {isLocked && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-center text-sm font-semibold text-gray-700 p-4">
                            🔒 Upgrade to {event.tier.toUpperCase()} to access this event
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}

        {/* Modal */}
        <Dialog
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white shadow-xl p-6 space-y-4">
              <Dialog.Title className="text-2xl font-bold text-gray-800">
                {selectedEvent?.title}
              </Dialog.Title>
              <img
                src={selectedEvent?.image_url}
                alt={selectedEvent?.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-600">{selectedEvent?.description}</p>
              <p className="text-sm text-gray-500">
                📅 {new Date(selectedEvent?.event_date || '').toLocaleString()}
              </p>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </main>
  );
}
