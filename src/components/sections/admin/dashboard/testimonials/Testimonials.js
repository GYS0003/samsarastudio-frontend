'use client';

import React, { useEffect, useState } from 'react';
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '@/services/apis';
import Image from 'next/image';

const initialForm = {
  name: '',
  occupation: '',
  feedback: '',
  imageUrl: '',
};

const MAX_WORDS = 30;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Added for image preview
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      setMessage(err.message || 'Failed to fetch testimonials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const wordCount = countWords(formData.feedback);
    if (wordCount > MAX_WORDS) {
      setMessage(`Feedback must not exceed ${MAX_WORDS} words. Current: ${wordCount}`);
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('occupation', formData.occupation);
      fd.append('feedback', formData.feedback);
      
      if (imageFile) {
        fd.append('image', imageFile);
      }

      if (editingId) {
        await updateTestimonial(editingId, fd);
        setMessage('Testimonial updated successfully');
      } else {
        await createTestimonial(fd);
        setMessage('Testimonial created successfully');
      }

      setFormData(initialForm);
      setImageFile(null);
      setImagePreview(null);
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      setMessage(err.message || 'Submit failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      occupation: testimonial.occupation,
      feedback: testimonial.feedback,
      imageUrl: testimonial.imageUrl,
    });
    setImagePreview(testimonial.imageUrl);
    setEditingId(testimonial._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        setLoading(true);
        await deleteTestimonial(id);
        setMessage('Testimonial deleted.');
        fetchTestimonials();
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 pt-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-md shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Testimonials</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow"
        encType="multipart/form-data"
      >
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              required
              value={formData.occupation}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700"
          />
          {imagePreview && (
            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Image Preview
              </span>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Feedback
          </label>
          <textarea
            name="feedback"
            placeholder="Feedback"
            required
            value={formData.feedback}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
          />
          <div className="flex justify-between mt-1">
            <p
              className={`text-sm ${
                countWords(formData.feedback) > MAX_WORDS 
                  ? 'text-red-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Word count: {countWords(formData.feedback)} / {MAX_WORDS}
            </p>
            {countWords(formData.feedback) > MAX_WORDS && (
              <p className="text-sm text-red-500">
                Please reduce your feedback
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
              loading 
                ? 'bg-blue-500 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <>
                <span className="loader border-white border-t-transparent border-2 w-4 h-4 rounded-full animate-spin" />
                {editingId ? 'Updating...' : 'Creating...'}
              </>
            ) : editingId ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      {message && (
        <div className={`mb-6 p-3 rounded text-center ${
          message.includes('success') || message.includes('deleted')
            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
        }`}>
          {message}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left border-b dark:border-gray-600">Image</th>
              <th className="p-3 text-left border-b dark:border-gray-600">Name</th>
              <th className="p-3 text-left border-b dark:border-gray-600">Occupation</th>
              <th className="p-3 text-left border-b dark:border-gray-600">Feedback</th>
              <th className="p-3 text-center border-b dark:border-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td 
                  colSpan="5" 
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {loading ? 'Loading testimonials...' : 'No testimonials found'}
                </td>
              </tr>
            ) : (
              testimonials.map((t) => (
                <tr 
                  key={t._id} 
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="p-3">
                    {t.imageUrl ? (
                      <div className="relative h-12 w-12 rounded-full overflow-hidden mx-auto">
                        <Image
                          src={t.imageUrl}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mx-auto">
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                          No Image
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="p-3 dark:text-gray-300">{t.name}</td>
                  <td className="p-3 dark:text-gray-300">{t.occupation}</td>
                  <td className="p-3 max-w-xs dark:text-gray-300">
                    <div className="line-clamp-2">{t.feedback}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(t)}
                        disabled={loading}
                        className="px-3 py-1 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        disabled={loading}
                        className="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Testimonials;