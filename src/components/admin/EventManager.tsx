// components/admin/EventsManager.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
}

export default function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Cloudinary config
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const snapshot = await getDocs(eventsRef);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
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
    formData.append('folder', 'school-events');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Cloudinary error details:', data);
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

    try {
      let imageUrl = '';

      // Upload image if provided
      if (imageFile) {
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
          setMessage('Cloudinary is not configured. Please check your .env.local file.');
          setLoading(false);
          return;
        }

        setUploadProgress(30);
        imageUrl = await uploadToCloudinary(imageFile);
        setUploadProgress(70);
      }

      // Add event to Firestore
      await addDoc(collection(db, 'events'), {
        title,
        description,
        date,
        imageUrl,
        createdAt: new Date().toISOString()
      });

      setUploadProgress(100);
      setMessage('Event added successfully!');
      setTitle('');
      setDescription('');
      setDate('');
      setImageFile(null);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      fetchEvents();
    } catch (error: any) {
      console.error('Error adding event:', error);
      
      let errorMessage = 'Error adding event: ';
      
      if (error.message.includes('Cloudinary')) {
        errorMessage += error.message;
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setMessage(errorMessage);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteDoc(doc(db, 'events', eventId));
      setMessage('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setMessage('Error deleting event.');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-[#2E1A47]">Events Manager</h2>

      {/* Add Event Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#2E1A47]">Add New Event</h3>

        {message && (
          <div className={`p-4 rounded-lg ${message.includes('Error') || message.includes('not configured') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
            placeholder="Annual Sports Day"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
            placeholder="Event description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#4CB5E6] text-white font-semibold rounded-lg hover:bg-[#FBD106] transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? `${imageFile ? 'Uploading' : 'Adding'} Event... ${uploadProgress}%` : 'Add Event'}
        </button>
      </form>

      {/* Events List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#2E1A47]">Existing Events</h3>
        
        {events.length === 0 ? (
          <p className="text-gray-500">No events added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white border rounded-lg p-4 shadow-sm">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                )}
                <h4 className="font-semibold text-lg text-[#2E1A47] mb-2">
                  {event.title}
                </h4>
                <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                <p className="text-[#4CB5E6] text-sm mb-4">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Delete Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
