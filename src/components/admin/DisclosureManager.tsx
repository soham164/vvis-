// components/admin/DisclosureManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

interface Disclosure {
  id: string;
  title: string;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  category: string;
}

export default function DisclosureManager() {
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    'General',
    'Academic',
    'Infrastructure',
    'Faculty',
    'Financial',
    'Affiliation',
    'Safety & Security'
  ];

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
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!file) {
      setMessage('Please select a PDF file to upload.');
      setLoading(false);
      return;
    }

    try {
      // Upload PDF file
      const fileRef = ref(storage, `disclosures/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      // Add disclosure metadata to Firestore
      await addDoc(collection(db, 'disclosures'), {
        title,
        fileName: file.name,
        fileUrl,
        category,
        uploadDate: new Date().toISOString()
      });

      setMessage('Document uploaded successfully!');
      setTitle('');
      setCategory('General');
      setFile(null);
      fetchDisclosures();
    } catch (error) {
      console.error('Error uploading document:', error);
      setMessage('Error uploading document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (disclosureId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;

    try {
      await deleteDoc(doc(db, 'disclosures', disclosureId));
      setMessage('Document deleted successfully!');
      fetchDisclosures();
    } catch (error) {
      console.error('Error deleting document:', error);
      setMessage('Error deleting document.');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-[#2E1A47]">Mandatory Disclosures</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#2E1A47]">Upload New Document</h3>

        {message && (
          <div className={`p-4 rounded-lg ${message.includes('Error') || message.includes('Please') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
              placeholder="School Affiliation Certificate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PDF Document *
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
          />
          {file && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#4CB5E6] text-white font-semibold rounded-lg hover:bg-[#FBD106] transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>

      {/* Documents List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#2E1A47]">
          Uploaded Documents ({disclosures.length})
        </h3>
        
        {disclosures.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Upload Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {disclosures.map((disclosure) => (
                  <tr key={disclosure.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{disclosure.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{disclosure.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(disclosure.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <a
                          href={disclosure.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDelete(disclosure.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}