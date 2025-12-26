// components/admin/TickerControl.tsx
'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TickerControl() {
  const [noticeText, setNoticeText] = useState('');
  const [currentNotice, setCurrentNotice] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCurrentNotice();
  }, []);

  const fetchCurrentNotice = async () => {
    try {
      const noticesRef = collection(db, 'admissionNotices');
      const noticesQuery = query(noticesRef, orderBy('timestamp', 'desc'), limit(1));
      const snapshot = await getDocs(noticesQuery);
      
      if (!snapshot.empty) {
        setCurrentNotice({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data()
        });
      }
    } catch (error) {
      console.error('Error fetching notice:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Delete old notice if exists
      if (currentNotice) {
        await deleteDoc(doc(db, 'admissionNotices', currentNotice.id));
      }

      // Add new notice
      await addDoc(collection(db, 'admissionNotices'), {
        text: noticeText,
        timestamp: new Date().toISOString()
      });

      setMessage('Admission notice updated successfully! It will appear on the homepage immediately.');
      setNoticeText('');
      fetchCurrentNotice();
    } catch (error) {
      console.error('Error updating notice:', error);
      setMessage('Error updating notice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove the current admission notice?')) return;

    try {
      if (currentNotice) {
        await deleteDoc(doc(db, 'admissionNotices', currentNotice.id));
        setCurrentNotice(null);
        setMessage('Admission notice removed successfully.');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      setMessage('Error deleting notice.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#2E1A47] mb-2">
          Admission Notice Ticker
        </h2>
        <p className="text-gray-600">
          This notice will scroll across the homepage banner. Keep it concise and informative.
        </p>
      </div>

      {/* Current Notice Display */}
      {currentNotice && (
        <div className="bg-[#4CB5E6]/10 border-l-4 border-[#4CB5E6] p-6 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#2E1A47] mb-2">
                Current Notice (Live on Homepage)
              </h3>
              <p className="text-gray-700">{currentNotice.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {new Date(currentNotice.timestamp).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleDelete}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Update Notice Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#2E1A47]">
          {currentNotice ? 'Update Notice' : 'Create New Notice'}
        </h3>

        {message && (
          <div className={`p-4 rounded-lg ${message.includes('Error') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notice Text
          </label>
          <textarea
            value={noticeText}
            onChange={(e) => setNoticeText(e.target.value)}
            required
            rows={3}
            maxLength={200}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CB5E6]"
            placeholder="Admissions open for Class 1-12. Limited seats available. Apply now!"
          />
          <p className="text-sm text-gray-500 mt-1">
            {noticeText.length}/200 characters
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">Real-time Updates</p>
              <p>Thanks to Firestore's real-time listeners, visitors will see the updated notice immediately without refreshing the page!</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#4CB5E6] text-white font-semibold rounded-lg hover:bg-[#FBD106] transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? 'Updating...' : currentNotice ? 'Update Notice' : 'Publish Notice'}
        </button>
      </form>

      {/* Preview */}
      {noticeText && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#2E1A47] mb-4">Preview</h3>
          <div className="bg-[#4CB5E6] py-3 overflow-hidden rounded">
            <div className="whitespace-nowrap text-[#2E1A47] font-semibold text-lg animate-marquee">
              🎓 {noticeText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}