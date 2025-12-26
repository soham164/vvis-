'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

interface Faculty {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  imageUrl: string;
}

const departments = ['Science', 'Mathematics', 'English', 'Social Studies', 'Hindi', 'Computer Science', 'Physical Education', 'Arts', 'Administration'];

export default function FacultyCRUD() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('Science');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

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
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setName('');
    setDesignation('');
    setDepartment('Science');
    setQualification('');
    setExperience('');
    setImageFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';

      if (imageFile) {
        const imageRef = ref(storage, `faculty/${Date.now()}_${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const facultyData = {
        name,
        designation,
        department,
        qualification,
        experience,
        ...(imageUrl && { imageUrl }),
        updatedAt: new Date().toISOString()
      };

      if (editingId) {
        await updateDoc(doc(db, 'faculty', editingId), facultyData);
        setMessage('Faculty member updated successfully!');
      } else {
        await addDoc(collection(db, 'faculty'), {
          ...facultyData,
          imageUrl: imageUrl || 'https://via.placeholder.com/200x200?text=Faculty',
          createdAt: new Date().toISOString()
        });
        setMessage('Faculty member added successfully!');
      }

      resetForm();
      fetchFaculty();
    } catch (error) {
      console.error('Error saving faculty:', error);
      setMessage('Error saving faculty member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: Faculty) => {
    setEditingId(member.id);
    setName(member.name);
    setDesignation(member.designation);
    setDepartment(member.department);
    setQualification(member.qualification);
    setExperience(member.experience);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (facultyId: string) => {
    if (!confirm('Are you sure you want to delete this faculty member?')) return;

    try {
      await deleteDoc(doc(db, 'faculty', facultyId));
      setMessage('Faculty member deleted successfully!');
      fetchFaculty();
    } catch (error) {
      console.error('Error deleting faculty:', error);
      setMessage('Error deleting faculty member.');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-[#2E1A47]">Faculty Management</h2>

      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#2E1A47]">
          {editingId ? 'Edit Faculty Member' : 'Add New Faculty Member'}
        </h3>

        {message && (
          <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
              placeholder="Dr. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
            <input
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
              placeholder="Senior Teacher"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
              placeholder="10 years"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Qualification *</label>
          <input
            type="text"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
            placeholder="M.Sc., B.Ed."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo {editingId ? '(Leave empty to keep current)' : ''}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-[#4CB5E6] text-white font-semibold rounded-lg hover:bg-[#FBD106] hover:text-[#2E1A47] transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Faculty' : 'Add Faculty'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Faculty List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#2E1A47]">
          Faculty Members ({faculty.length})
        </h3>
        
        {faculty.length === 0 ? (
          <p className="text-gray-500">No faculty members added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faculty.map((member) => (
              <div key={member.id} className="bg-white border rounded-lg p-4 shadow-sm flex">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-lg text-[#2E1A47]">{member.name}</h4>
                  <p className="text-[#4CB5E6] text-sm">{member.designation}</p>
                  <p className="text-gray-600 text-sm">{member.department}</p>
                  <p className="text-gray-500 text-xs">{member.qualification}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
