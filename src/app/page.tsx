// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { db, isConfigured } from '@/lib/firebase';
import Link from 'next/link';
import PencilLoader from '@/components/PencilLoader';

export default function HomePage() {
  const [admissionNotice, setAdmissionNotice] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Handle client-side mounting
    setIsMounted(true);
    
    const loadData = async () => {
      if (!isConfigured) {
        // Demo mode - show placeholder data
        setAdmissionNotice('Admissions open for 2025-26! Limited seats available. Apply now!');
        setUpcomingEvents([
          { id: '1', title: 'Annual Sports Day', description: 'Join us for exciting athletic competitions', date: '2025-01-15', imageUrl: 'https://via.placeholder.com/400x300?text=Sports+Day' },
          { id: '2', title: 'Science Exhibition', description: 'Students showcase innovative projects', date: '2025-02-20', imageUrl: 'https://via.placeholder.com/400x300?text=Science+Fair' },
          { id: '3', title: 'Annual Day', description: 'Grand celebration with cultural performances', date: '2025-03-10', imageUrl: 'https://via.placeholder.com/400x300?text=Annual+Day' },
        ]);
        // Simulate loading time
        setTimeout(() => setIsLoading(false), 1500);
        return;
      }

      // Real-time listener for admission notice
      const noticeRef = collection(db, 'admissionNotices');
      const noticeQuery = query(noticeRef, orderBy('timestamp', 'desc'), limit(1));
      
      const unsubscribe = onSnapshot(noticeQuery, (snapshot) => {
        if (!snapshot.empty) {
          setAdmissionNotice(snapshot.docs[0].data().text);
        }
      });

      // Fetch upcoming events
      try {
        const eventsRef = collection(db, 'events');
        const eventsQuery = query(eventsRef, orderBy('date', 'desc'), limit(3));
        const snapshot = await getDocs(eventsQuery);
        setUpcomingEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }

      return () => unsubscribe();
    };

    loadData();
  }, []);

  // Show loader while loading or not mounted
  if (isLoading || !isMounted) {
    return <PencilLoader />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 bg-[#2E1A47]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={() => {
              // Ensure video is ready
              console.log('Video loaded');
            }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="/hero-video.webm" type="video/webm" />
            {/* Fallback if video doesn't load */}
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(46, 26, 71, 0.7), rgba(46, 26, 71, 0.4))'
          }}
        />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to Excellence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Nurturing minds, shaping futures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admissions"
              className="px-8 py-4 bg-[#FBD106] text-[#2E1A47] font-semibold rounded-lg hover:bg-[#4CB5E6] transition-all duration-300 transform hover:scale-105"
            >
              Apply Now
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Scrolling Admission Notice Ticker */}
      {admissionNotice && (
        <div className="bg-[#4CB5E6] py-3 overflow-hidden">
          <motion.div
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="whitespace-nowrap text-[#2E1A47] font-semibold text-lg"
          >
            🎓 {admissionNotice}
          </motion.div>
        </div>
      )}

      {/* Quick Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Years of Excellence', value: '25+' },
              { label: 'Expert Faculty', value: '100+' },
              { label: 'Happy Students', value: '2000+' },
              { label: 'Success Rate', value: '98%' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-[#2E1A47] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#2E1A47] mb-4">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-[#FBD106] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2E1A47] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <p className="text-sm text-[#4CB5E6] font-semibold">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-block px-8 py-3 bg-[#2E1A47] text-white font-semibold rounded-lg hover:bg-[#4CB5E6] transition-colors duration-300"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}