'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  category: string;
}

const categories = ['Sports', 'Academic', 'Cultural', 'Infrastructure', 'Celebration', 'Activities'];

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Sports');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cloudinary config - get from environment variables
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const galleryRef = collection(db, 'gallery');
      const snapshot = await getDocs(galleryRef);
      const imageData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GalleryImage[];
      setImages(imageData);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'school-gallery');

    console.log('Cloudinary config:', {
      cloudName: CLOUDINARY_CLOUD_NAME,
      uploadPreset: CLOUDINARY_UPLOAD_PRESET,
      fileSize: file.size,
      fileType: file.type
    });

    try {
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
        // Show the actual error from Cloudinary
        const errorMsg = data.error?.message || JSON.stringify(data);
        throw new Error(`Cloudinary error: ${errorMsg}`);
      }

      return data.secure_url;
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

    if (!imageFile) {
      setMessage('Please select an image to upload.');
      setLoading(false);
      return;
    }

    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      setMessage('Cloudinary is not configured. Please check your .env.local file.');
      setLoading(false);
      return;
    }

    try {
      console.log('Uploading to Cloudinary...');
      setUploadProgress(30);
      
      // Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(imageFile);
      console.log('Cloudinary URL:', imageUrl);
      setUploadProgress(70);

      // Save to Firestore
      console.log('Saving to Firestore...');
      await addDoc(collection(db, 'gallery'), {
        title,
        category,
        imageUrl,
        uploadedAt: new Date().toISOString()
      });

      setUploadProgress(100);
      console.log('Successfully saved to Firestore!');
      setMessage('Image uploaded successfully!');
      setTitle('');
      setCategory('Sports');
      setImageFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchImages();
    } catch (error: any) {
      console.error('Error uploading image:', error);
      
      let errorMessage = 'Error uploading image: ';
      
      if (error.message.includes('Cloudinary')) {
        errorMessage += error.message + ' - Check browser console for details. ';
        errorMessage += 'Make sure your upload preset is set to "Unsigned" in Cloudinary settings.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await deleteDoc(doc(db, 'gallery', imageId));
      setMessage('Image deleted successfully!');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      setMessage('Error deleting image.');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-[#2E1A47]">Gallery Manager</h2>

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
                Check CLOUDINARY_SETUP.md for instructions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#2E1A47]">Upload New Image</h3>

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Image Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
              placeholder="Annual Sports Day 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Image File *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
          />
          {imageFile && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {imageFile.name} ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET}
          className="w-full py-3 bg-[#4CB5E6] text-white font-semibold rounded-lg hover:bg-[#FBD106] hover:text-[#2E1A47] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? `Uploading... ${uploadProgress}%` : 'Upload Image'}
        </button>
      </form>

      {/* Gallery Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#2E1A47]">
          Gallery Images ({images.length})
        </h3>
        
        {images.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-2">
                  <p className="text-white text-sm font-semibold text-center mb-1">{image.title}</p>
                  <span className="text-white/80 text-xs mb-2">{image.category}</span>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
