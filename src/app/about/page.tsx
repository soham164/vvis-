// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="relative bg-[#2E1A47] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
          >
            About Our School
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Excellence in Education Since 1999
          </motion.p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-[#2E1A47] mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              At [School Name], we are committed to providing quality education that nurtures 
              intellectual curiosity, critical thinking, and moral values. Our mission is to 
              empower students to become responsible global citizens who contribute positively 
              to society.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in holistic development - academic excellence combined with 
              character building, creativity, and physical fitness.
            </p>
          </motion.div>

          {/* Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-[#2E1A47] mb-6">
              Our Vision
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To be a leading educational institution that shapes future leaders through 
              innovative teaching methods, state-of-the-art facilities, and a supportive 
              learning environment that celebrates diversity and encourages excellence.
            </p>
          </motion.div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-[#2E1A47] mb-6">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4CB5E6] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2E1A47] mb-2">Excellence</h3>
                  <p className="text-gray-600">
                    Striving for the highest standards in academics and character development.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4CB5E6] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2E1A47] mb-2">Integrity</h3>
                  <p className="text-gray-600">
                    Upholding honesty, transparency, and ethical conduct in all endeavors.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4CB5E6] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2E1A47] mb-2">Innovation</h3>
                  <p className="text-gray-600">
                    Embracing creative thinking and modern teaching methodologies.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#4CB5E6] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">❤️</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2E1A47] mb-2">Compassion</h3>
                  <p className="text-gray-600">
                    Fostering empathy, kindness, and respect for all members of our community.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}