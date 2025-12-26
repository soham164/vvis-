'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import LoginForm from '@/components/admin/adminform';
import EventsManager from '@/components/admin/EventManager';
import DisclosureManager from '@/components/admin/DisclosureManager';
import TickerControl from '@/components/admin/tickercontrol';
import FacultyCRUD from '@/components/admin/FacultyCRUD';
import GalleryManager from '@/components/admin/GalleryManager';

type TabType = 'ticker' | 'events' | 'faculty' | 'gallery' | 'disclosures';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('ticker');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-2xl text-[#2E1A47]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'ticker', label: 'Admission Ticker', icon: '📢' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'disclosures', label: 'Disclosures', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-[#2E1A47] text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-white/70 text-sm">Welcome, {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-lg p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#4CB5E6] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3 text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
              <h3 className="font-semibold text-[#2E1A47] mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="/" target="_blank" className="block text-[#4CB5E6] hover:underline">
                  → View Website
                </a>
                <a href="/events" target="_blank" className="block text-[#4CB5E6] hover:underline">
                  → View Events Page
                </a>
                <a href="/gallery" target="_blank" className="block text-[#4CB5E6] hover:underline">
                  → View Gallery
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow-lg p-6">
            {activeTab === 'ticker' && <TickerControl />}
            {activeTab === 'events' && <EventsManager />}
            {activeTab === 'faculty' && <FacultyCRUD />}
            {activeTab === 'gallery' && <GalleryManager />}
            {activeTab === 'disclosures' && <DisclosureManager />}
          </main>
        </div>
      </div>
    </div>
  );
}
