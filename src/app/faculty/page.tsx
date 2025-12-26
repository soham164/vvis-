'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  imageUrl: string;
}

const departments = ['All', 'Science', 'Mathematics', 'English', 'Social Studies', 'Hindi', 'Computer Science', 'Physical Education', 'Arts'];

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const facultyRef = collection(db, 'faculty');
      const snapshot = await getDocs(facultyRef);
      const facultyData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Faculty[];
      setFaculty(facultyData);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFaculty = selectedDepartment === 'All'
    ? faculty
    : faculty.filter(f => f.department === selectedDepartment);

  const placeholderFaculty: Faculty[] = [
    { id: '1', name: 'Dr. Rajesh Kumar', designation: 'Principal', department: 'Administration', qualification: 'Ph.D. in Education', experience: '25 years', imageUrl: 'https://via.placeholder.com/200x200?text=Principal' },
    { id: '2', name: 'Mrs. Priya Sharma', designation: 'Vice Principal', department: 'Science', qualification: 'M.Sc., B.Ed.', experience: '20 years', imageUrl: 'https://via.placeholder.com/200x200?text=VP' },
    { id: '3', name: 'Mr. Amit Singh', designation: 'HOD Science', department: 'Science', qualification: 'M.Sc. Physics, B.Ed.', experience: '15 years', imageUrl: 'https://via.placeholder.com/200x200?text=HOD' },
    { id: '4', name: 'Mrs. Sunita Verma', designation: 'Senior Teacher', department: 'Mathematics', qualification: 'M.Sc. Mathematics', experience: '12 years', imageUrl: 'https://via.placeholder.com/200x200?text=Teacher' },
    { id: '5', name: 'Mr. Rahul Gupta', designation: 'Teacher', department: 'English', qualification: 'M.A. English, B.Ed.', experience: '8 years', imageUrl: 'https://via.placeholder.com/200x200?text=Teacher' },
    { id: '6', name: 'Mrs. Kavita Joshi', designation: 'Teacher', department: 'Hindi', qualification: 'M.A. Hindi, B.Ed.', experience: '10 years', imageUrl: 'https://via.placeholder.com/200x200?text=Teacher' },
    { id: '7', name: 'Mr. Vikram Patel', designation: 'Teacher', department: 'Computer Science', qualification: 'MCA, B.Ed.', experience: '7 years', imageUrl: 'https://via.placeholder.com/200x200?text=Teacher' },
    { id: '8', name: 'Mr. Suresh Yadav', designation: 'Sports Coach', department: 'Physical Education', qualification: 'M.P.Ed.', experience: '14 years', imageUrl: 'https://via.placeholder.com/200x200?text=Coach' },
  ];

  const displayFaculty = faculty.length > 0 
    ? filteredFaculty 
    : placeholderFaculty.filter(f => selectedDepartment === 'All' || f.department === selectedDepartment);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#2E1A47]">Loading faculty...</div>
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
            Our Faculty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Meet our dedicated team of educators
          </motion.p>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedDepartment === dept
                    ? 'bg-[#4CB5E6] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayFaculty.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <p className="text-2xl text-gray-500">No faculty in this department</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayFaculty.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2E1A47]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2E1A47] mb-1">{member.name}</h3>
                    <p className="text-[#4CB5E6] font-semibold mb-2">{member.designation}</p>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Department:</span> {member.department}</p>
                      <p><span className="font-medium">Qualification:</span> {member.qualification}</p>
                      <p><span className="font-medium">Experience:</span> {member.experience}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-[#2E1A47]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Team</h2>
            <p className="text-white/80 mb-8">
              We're always looking for passionate educators to join our family. 
              If you share our vision for excellence in education, we'd love to hear from you.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-[#FBD106] text-[#2E1A47] font-semibold rounded-lg hover:bg-[#4CB5E6] hover:text-white transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
