// components/admin/DisclosureManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cloudinary config
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

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

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'school-disclosures');

    console.log('Uploading PDF to Cloudinary:', {
      cloudName: CLOUDINARY_CLOUD_NAME,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    });

    try {
      // Use image/upload endpoint which supports PDFs and allows inline viewing
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      console.log('Cloudinary response:', data);

      if (!response.ok) {
        console.error('Cloudinary error details:', data);
        const errorMsg = data.error?.message || JSON.stringify(data);
        throw new Error(`Cloudinary error: ${errorMsg}`);
      }

      // Convert to a viewable URL format
      // Change from /image/upload/ to /image/upload/fl_attachment/ for inline viewing
      const viewableUrl = data.secure_url.replace('/upload/', '/upload/fl_attachment:false/');
      console.log('Viewable URL:', viewableUrl);
      
      return viewableUrl;
    } catch (error: any) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setUploadProgress(0);

    if (!file) {
      setMessage('Please select a PDF file to upload.');
      setLoading(false);
      return;
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setMessage('Cloudinary is not configured. Please check your .env.local file.');
      setLoading(false);
      return;
    }

    try {
      console.log('Uploading PDF to Cloudinary...');
      setUploadProgress(30);
      
      // Upload to Cloudinary
      const fileUrl = await uploadToCloudinary(file);
      console.log('Cloudinary URL:', fileUrl);
      setUploadProgress(70);

      // Add disclosure metadata to Firestore
      console.log('Saving to Firestore...');
      await addDoc(collection(db, 'disclosures'), {
        title,
        fileName: file.name,
        fileUrl,
        category,
        uploadDate: new Date().toISOString()
      });

      setUploadProgress(100);
      console.log('Successfully saved to Firestore!');
      setMessage('Document uploaded successfully!');
      setTitle('');
      setCategory('General');
      setFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchDisclosures();
    } catch (error: any) {
      console.error('Error uploading document:', error);
      
      let errorMessage = 'Error uploading document: ';
      
      if (error.message.includes('Cloudinary')) {
        errorMessage += error.message + ' - Check browser console for details.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
      setUploadProgress(0);
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

      {/* Cloudinary Status */}
      {(!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Cloudinary not configured.</strong> Please add your Cloudinary credentials to .env.local file.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#2E1A47]">Upload New Document</h3>

        {message && (
          <div className={`p-4 rounded-lg ${message.includes('Error') || message.includes('Please') || message.includes('not configured') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        {loading && uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#4CB5E6] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
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
          disabled={loading || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET}
          className="w-full py-3 bg-[#4CB5E6] text-white font-semibold rounded-lg hover:bg-[#FBD106] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? `Uploading... ${uploadProgress}%` : 'Upload Document'}
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