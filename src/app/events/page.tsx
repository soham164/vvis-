'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const eventsQuery = query(eventsRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(eventsQuery);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  
  const filteredEvents = events.filter(event => {
    if (filter === 'upcoming') return event.date >= today;
    if (filter === 'past') return event.date < today;
    return true;
  });

  const placeholderEvents: Event[] = [
    { id: '1', title: 'Annual Sports Day', description: 'Join us for an exciting day of athletic competitions and team spirit.', date: '2025-01-15', imageUrl: 'https://via.placeholder.com/400x300?text=Sports+Day' },
    { id: '2', title: 'Science Exhibition', description: 'Students showcase their innovative science projects and experiments.', date: '2025-02-20', imageUrl: 'https://via.placeholder.com/400x300?text=Science+Fair' },
    { id: '3', title: 'Annual Day Celebration', description: 'A grand celebration featuring cultural performances and awards ceremony.', date: '2025-03-10', imageUrl: 'https://via.placeholder.com/400x300?text=Annual+Day' },
    { id: '4', title: 'Parent-Teacher Meeting', description: 'An opportunity for parents to discuss their child\'s progress with teachers.', date: '2025-01-25', imageUrl: 'https://via.placeholder.com/400x300?text=PTM' },
  ];

  const displayEvents = events.length > 0 ? filteredEvents : placeholderEvents;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#2E1A47]">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative bg-[#2E1A47] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
          >
            School Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Stay updated with our latest activities and celebrations
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            {(['all', 'upcoming', 'past'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filter === tab
                    ? 'bg-[#4CB5E6] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-2xl text-gray-500">No events found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  {event.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-[#FBD106] text-[#2E1A47] px-3 py-1 rounded-full text-sm font-semibold">
                        {new Date(event.date) >= new Date() ? 'Upcoming' : 'Past'}
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-[#4CB5E6] text-sm font-semibold mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-[#2E1A47] mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Calendar CTA */}
      <section className="py-20 bg-[#2E1A47]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Never Miss an Event</h2>
            <p className="text-white/80 mb-8">
              Stay connected with our school community and be part of all the exciting activities.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-[#FBD106] text-[#2E1A47] font-semibold rounded-lg hover:bg-[#4CB5E6] hover:text-white transition-colors"
            >
              Contact Us for Updates
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
