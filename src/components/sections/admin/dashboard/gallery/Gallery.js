'use client';

import React, { useEffect, useState } from 'react';
import {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage,
} from '@/services/apis';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all gallery images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getGalleryImages();
      setImages(data);
    } catch (err) {
      console.error('Failed to fetch gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Upload image
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      await createGalleryImage(formData);
      setMessage('Image uploaded successfully.');
      setFile(null);
      await fetchImages();
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteGalleryImage(id);
      setMessage('Image deleted.');
      await fetchImages();
    } catch (err) {
      console.error('Delete failed:', err);
      setMessage('Delete failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Gallery</h1>

      {/* Upload Image */}
      <div className="mb-6 flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-900 border p-4 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-white dark:bg-gray-700 dark:border-gray-600"
        />
        {!loading?(<button
          onClick={handleUpload}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={!file || loading}
        >
          Upload
        </button>):(
          <button className='bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700'>Uploading...</button>
        )}
      </div>

      {/* Status Message */}
      {message && (
        <p className="text-center text-sm text-blue-600 mb-4">{message}</p>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative group">
            <img
              src={img.imageUrl}
              alt="Gallery"
              className="w-full h-48 object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* No Images */}
      {!loading && images.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No images found.</p>
      )}
    </div>
  );
};

export default Gallery;
