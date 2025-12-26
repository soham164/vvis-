'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Disclosure {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  category: string;
}

const categories = [
  'All',
  'General',
  'Academic',
  'Infrastructure',
  'Faculty',
  'Financial',
  'Affiliation',
  'Safety & Security'
];

export default function MandatoryDisclosurePage() {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchDisclosures();
  }, []);

  const fetchDisclosures = async () => {
    try {
      const disclosuresRef = collection(db, 'disclosures');
      const snapshot = await getDocs(disclosuresRef);
      const disclosureData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Disclosure[];
      setDisclosures(disclosureData);
    } catch (error) {
      console.error('Error fetching disclosures:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDisclosures = selectedCategory === 'All'
    ? disclosures
    : disclosures.filter(d => d.category === selectedCategory);

  const placeholderDisclosures: Disclosure[] = [
    { id: '1', title: 'School Affiliation Certificate', fileName: 'affiliation.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Affiliation' },
    { id: '2', title: 'Trust Registration Certificate', fileName: 'trust.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'General' },
    { id: '3', title: 'NOC from State Government', fileName: 'noc.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'General' },
    { id: '4', title: 'Recognition Certificate', fileName: 'recognition.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Affiliation' },
    { id: '5', title: 'Building Safety Certificate', fileName: 'safety.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Safety & Security' },
    { id: '6', title: 'Fire Safety Certificate', fileName: 'fire.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Safety & Security' },
    { id: '7', title: 'Land Certificate', fileName: 'land.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Infrastructure' },
    { id: '8', title: 'Fee Structure Document', fileName: 'fees.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Financial' },
    { id: '9', title: 'Faculty List with Qualifications', fileName: 'faculty.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Faculty' },
    { id: '10', title: 'Academic Calendar', fileName: 'calendar.pdf', fileUrl: '#', uploadDate: '2024-01-15', category: 'Academic' },
  ];

  const displayDisclosures = disclosures.length > 0 
    ? filteredDisclosures 
    : placeholderDisclosures.filter(d => selectedCategory === 'All' || d.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#2E1A47]">Loading documents...</div>
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
            Mandatory Disclosure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Transparency in education - Access all required documents
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-[#4CB5E6] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Documents List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayDisclosures.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-2xl text-gray-500">No documents in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayDisclosures.map((disclosure, index) => (
                <motion.div
                  key={disclosure.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#2E1A47] mb-1">
                        {disclosure.title}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mb-2">
                        {disclosure.category}
                      </span>
                      <p className="text-sm text-gray-500 mb-4">
                        Uploaded: {new Date(disclosure.uploadDate).toLocaleDateString()}
                      </p>
                      <a
                        href={disclosure.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#4CB5E6] hover:text-[#2E1A47] font-semibold transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View Document
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#4CB5E6]/10 border-l-4 border-[#4CB5E6] p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold text-[#2E1A47] mb-2">About Mandatory Disclosure</h3>
            <p className="text-gray-600">
              As per CBSE guidelines, all affiliated schools are required to make certain documents 
              publicly available. This page contains all mandatory disclosure documents for your 
              reference. If you need any additional information, please contact our administrative office.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
