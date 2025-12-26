'use client';

import { motion } from 'framer-motion';

const programs = [
  {
    level: 'Primary School',
    grades: 'Classes 1-5',
    description: 'Building strong foundations through interactive learning and play-based education.',
    subjects: ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Art & Craft', 'Physical Education'],
  },
  {
    level: 'Middle School',
    grades: 'Classes 6-8',
    description: 'Developing critical thinking and analytical skills with comprehensive curriculum.',
    subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Sanskrit/French', 'Computer Science'],
  },
  {
    level: 'Secondary School',
    grades: 'Classes 9-10',
    description: 'Preparing students for board examinations with focused academic training.',
    subjects: ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Information Technology'],
  },
  {
    level: 'Senior Secondary',
    grades: 'Classes 11-12',
    description: 'Specialized streams to prepare students for higher education and careers.',
    subjects: ['Science Stream', 'Commerce Stream', 'Humanities Stream'],
  },
];

const facilities = [
  { name: 'Smart Classrooms', icon: '💻', description: 'Interactive digital boards and modern teaching aids' },
  { name: 'Science Labs', icon: '🔬', description: 'Well-equipped Physics, Chemistry, and Biology laboratories' },
  { name: 'Computer Lab', icon: '🖥️', description: 'Latest computers with high-speed internet connectivity' },
  { name: 'Library', icon: '📚', description: 'Extensive collection of books, journals, and digital resources' },
  { name: 'Sports Complex', icon: '⚽', description: 'Indoor and outdoor sports facilities for all-round development' },
  { name: 'Art Studio', icon: '🎨', description: 'Dedicated space for creative arts and crafts activities' },
];

export default function AcademicsPage() {
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
            Academics
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Excellence in education through comprehensive curriculum
          </motion.p>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#2E1A47] mb-4">Our Programs</h2>
            <div className="w-24 h-1 bg-[#FBD106] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#4CB5E6] rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#2E1A47]">{program.level}</h3>
                    <p className="text-[#4CB5E6] font-semibold">{program.grades}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex flex-wrap gap-2">
                  {program.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#2E1A47] mb-4">Our Facilities</h2>
            <div className="w-24 h-1 bg-[#FBD106] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg p-6 text-center hover:bg-[#4CB5E6]/10 transition-colors"
              >
                <div className="text-5xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-semibold text-[#2E1A47] mb-2">{facility.name}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Highlights */}
      <section className="py-20 bg-[#2E1A47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Curriculum Highlights</h2>
            <div className="w-24 h-1 bg-[#FBD106] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'CBSE Affiliated', desc: 'Following the latest CBSE curriculum with regular updates' },
              { title: 'Holistic Development', desc: 'Focus on academics, sports, arts, and life skills' },
              { title: 'Experienced Faculty', desc: 'Qualified teachers with years of teaching experience' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#FBD106] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#2E1A47]">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
