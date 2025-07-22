'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { getAllBlogs, createBlog, updateBlog, deleteBlog, uploadBlogImage } from '@/services/apis';
import { X } from 'lucide-react';
import Image from 'next/image';

// Create a function to generate initial form state
const getInitialForm = () => ({
  id: '',
  title: '',
  author: '',
  date: '',
  readTime: '',
  coverImage: '',
  intro: { image: '', text: '', bulletPoints: [''] },
  tips: [{ title: '' }],
  conclusion: { text: '', image: '' },
});

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState(getInitialForm());
  const [editingId, setEditingId] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openPanel, setOpenPanel] = useState(false);
  const [imageCacheBuster, setImageCacheBuster] = useState(0); // To prevent caching

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (err) {
      alert('Failed to load blogs.');
    } finally {
      setLoading(false);
    }
  };

  const openCreatePanel = () => {
    setFormData(getInitialForm());
    setEditingId(null);
    setOpenPanel(true);
    setImageCacheBuster(Date.now()); // Bust image cache
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    if (keys.length === 1) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => {
        const updated = JSON.parse(JSON.stringify(prev)); // Deep clone
        let curr = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          curr = curr[keys[i]];
        }
        curr[keys[keys.length - 1]] = value;
        return updated;
      });
    }
  };

  const handleImageUpload = async (e, path) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const form = new FormData();
      form.append('image', file);
      const data = await uploadBlogImage(form);
      const imageUrl = `${data.url}?${Date.now()}`; // Add timestamp to prevent caching

      const keys = path.split('.');
      setFormData((prev) => {
        const updated = JSON.parse(JSON.stringify(prev)); // Deep clone
        let curr = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          curr = curr[keys[i]];
        }
        curr[keys[keys.length - 1]] = imageUrl;
        return updated;
      });
    } catch (error) {
      alert('Failed to upload image: ' + error.message);
    }
  };

  const handleBulletChange = (i, val) => {
    setFormData((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)); // Deep clone
      updated.intro.bulletPoints[i] = val;
      return updated;
    });
  };

  const addBulletPoint = () => {
    setFormData((prev) => ({
      ...prev,
      intro: {
        ...prev.intro,
        bulletPoints: [...prev.intro.bulletPoints, '']
      },
    }));
  };

  const removeBulletPoint = (index) => {
    if (formData.intro.bulletPoints.length > 1) {
      setFormData((prev) => ({
        ...prev,
        intro: {
          ...prev.intro,
          bulletPoints: prev.intro.bulletPoints.filter((_, i) => i !== index)
        },
      }));
    }
  };

  const addTip = () => {
    setFormData((prev) => ({
      ...prev,
      tips: [...prev.tips, { title: '' }]
    }));
  };

  const removeTip = (index) => {
    if (formData.tips.length > 1) {
      setFormData((prev) => ({
        ...prev,
        tips: prev.tips.filter((_, i) => i !== index)
      }));
    }
  };

  const handleTipChange = (i, field, val) => {
    setFormData((prev) => {
      const updated = JSON.parse(JSON.stringify(prev)); // Deep clone
      updated.tips[i][field] = val;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, date, readTime, id } = formData;
    if (!title || !author || !date || !readTime || !id) {
      alert('Please fill all required fields.');
      return;
    }

    setFormLoading(true);
    try {
      if (editingId) {
        await updateBlog(editingId, formData);
      } else {
        await createBlog(formData);
      }

      // Reset form and close panel
      setFormData(getInitialForm());
      setEditingId(null);
      setOpenPanel(false);
      setImageCacheBuster(Date.now());
      fetchBlogs();
    } catch (error) {
      alert('Failed to save blog: ' + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setEditingId(blog._id);
    setOpenPanel(true);
    setImageCacheBuster(Date.now()); // Bust image cache
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch {
      alert('Failed to delete blog.');
    }
  };

  // Improved ImagePreview component
  const ImagePreview = ({ src, alt, onRemove }) => {
    if (!src) return null;

    // Add cache busting query parameter
    const srcWithCacheBuster = `${src}${src.includes('?') ? '&' : '?'}cb=${imageCacheBuster}`;

    return (
      <div className="relative inline-block mt-2">
        <Image
          src={srcWithCacheBuster}
          alt={alt || 'Preview'}
          width={128}
          height={128}
          className="w-32 h-32 object-cover rounded border border-gray-300 dark:border-gray-700"
          unoptimized={src.startsWith('blob:')}
        />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-gray-800 dark:text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            ×
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="pt-16 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Blog Manager</h1>
        <button
          onClick={openCreatePanel}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-gray-800 dark:text-white px-4 py-2 rounded"
        >
          + Add Blog
        </button>
      </div>

      {loading ? (
        <p className="text-gray-800 dark:text-gray-300">Loading...</p>
      ) : blogs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-800 dark:text-gray-300">No blogs found. Create your first blog!</p>
        </div>
      ) : (
        blogs.map((b) => (
          <div key={b._id} className="p-4 border rounded shadow mb-4 flex justify-between items-center bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-700">
            <div className="flex items-center gap-4">
              {b.coverImage && (
                <Image
                  src={`${b.coverImage}?cb=${imageCacheBuster}`}
                  alt={b.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h2 className="text-lg text-gray-800  dark:text-gray-200 font-semibold">{b.title}</h2>
                <p className="text-sm text-gray-800  dark:text-gray-400">{b.author} · {b.date}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(b)}
                className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-gray-800 dark:text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b._id)}
                className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-gray-800 dark:text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 w-full sm:w-[600px] h-full bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800 z-50 transform transition-transform duration-300 ${openPanel ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between pt-16 items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{editingId ? 'Edit Blog' : 'Create Blog'}</h2>
          <button onClick={() => setOpenPanel(false)}><X className="w-5 h-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div>
              <input
                name="id"
                placeholder="Unique ID (Slug)"
                value={formData.id}
                onChange={handleChange}
                className="w-full p-2 border rounded
           bg-white text-gray-800 placeholder-gray-500 border-gray-300
           dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
           transition-colors duration-200"
                required
              />
            </div>

            <div>
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded
           bg-white text-gray-800 placeholder-gray-500 border-gray-300
           dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
           transition-colors duration-200"
                required
              />
            </div>

            <div>
              <input
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="w-full p-2 border rounded
           bg-white text-gray-800 placeholder-gray-500 border-gray-300
           dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
           transition-colors duration-200"
                required
              />
            </div>

            <div>
              <input
                name="date"
                placeholder="Date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded
           bg-white text-gray-800 placeholder-gray-500 border-gray-300
           dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
           transition-colors duration-200"
                required
              />
            </div>

            <div>
              <input
                name="readTime"
                placeholder="Read Time"
                value={formData.readTime}
                onChange={handleChange}
                className="w-full p-2 border rounded
           bg-white text-gray-800 placeholder-gray-500 border-gray-300
           dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
           transition-colors duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'coverImage')}
                className="w-full p-2 border rounded mb-2
                bg-gray-50 text-gray-700 border-gray-300
                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                cursor-not-allowed opacity-90"
              />
              {formData.coverImage && (
                <input
                  type="text"
                  value={formData.coverImage}
                  readOnly
                  className="w-full p-2 border rounded mb-2
                        bg-gray-50 text-gray-700 border-gray-300
                        dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                        focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                        cursor-not-allowed opacity-90"
                />
              )}
              <ImagePreview
                src={formData.coverImage}
                alt="Cover"
                onRemove={() => {
                  setFormData(prev => ({ ...prev, coverImage: '' }));
                }}
              />
            </div>

            <div className="border-t dark:border-gray-700 pt-4">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Intro</h3>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-300">Intro Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'intro.image')}
                  className="w-full p-2 border rounded mb-2
                  bg-gray-50 text-gray-700 border-gray-300
                  dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                  focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                  cursor-not-allowed opacity-90"
                />
                {formData.intro.image && (
                  <input
                    type="text"
                    value={formData.intro.image}
                    readOnly
                    className="w-full p-2 border rounded mb-2
                    bg-gray-50 text-gray-700 border-gray-300
                    dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                    cursor-not-allowed opacity-90"
                  />
                )}
                <ImagePreview
                  src={formData.intro.image}
                  alt="Intro"
                  onRemove={() => {
                    setFormData(prev => ({
                      ...prev,
                      intro: { ...prev.intro, image: '' }
                    }));
                  }}
                />
              </div>

              <div className="mt-2">
                <textarea
                  name="intro.text"
                  placeholder="Intro Text"
                  value={formData.intro.text}
                  onChange={handleChange}
                  className="w-full p-2 border rounded
           bg-white text-gray-800 placeholder-gray-500 border-gray-300
           dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600
           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
           transition-colors duration-200"
                  rows={3}
                />
              </div>

              <div className="mt-2 text-gray-800 dark:text-gray-100">
                <label className="block text-sm font-medium mb-2">Bullet Points</label>
                {formData.intro.bulletPoints.map((point, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input
                      value={point}
                      onChange={(e) => handleBulletChange(i, e.target.value)}
                      placeholder={`Bullet Point ${i + 1}`}
                      className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                    />
                    {formData.intro.bulletPoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBulletPoint(i)}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-gray-800 dark:text-white px-2 py-1 rounded text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addBulletPoint}
                  className="text-blue-600 dark:text-blue-400 text-sm underline hover:text-blue-800 dark:hover:text-blue-300"
                >
                  + Add Bullet Point
                </button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Tips</h3>
              {formData.tips.map((tip, i) => (
                <div key={i} className="border rounded p-3 mb-3 border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">Tip {i + 1}</span>
                    {formData.tips.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTip(i)}
                        className="bg-red-500 text-gray-800 dark:text-white px-2 py-1 rounded text-xs"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    value={tip.title}
                    onChange={(e) => handleTipChange(i, 'title', e.target.value)}
                    placeholder="Tip Title"
                    className="w-full p-2 border rounded mb-2
                    bg-gray-50 text-gray-700 border-gray-300
                    dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                    cursor-not-allowed opacity-90"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addTip}
                className="text-blue-600 dark:text-blue-400 text-sm underline hover:text-blue-800 dark:hover:text-blue-300"
              >
                + Add Tip
              </button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-100">Conclusion</h3>
              <div>
                <textarea
                  name="conclusion.text"
                  placeholder="Conclusion Text"
                  value={formData.conclusion.text}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2
                  bg-gray-50 text-gray-700 border-gray-300
                  dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                  focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                  cursor-not-allowed opacity-90"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Conclusion Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'conclusion.image')}
                  className="w-full p-2 border rounded mb-2
                  bg-gray-50 text-gray-700 border-gray-300
                  dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                  focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                  cursor-not-allowed opacity-90"
                />
                {formData.conclusion.image && (
                  <input
                    type="text"
                    value={formData.conclusion.image}
                    readOnly
                    className="w-full p-2 border rounded mb-2
                    bg-gray-50 text-gray-700 border-gray-300
                    dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600
                    focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500
                    cursor-not-allowed opacity-90"
                  />
                )}
                <ImagePreview
                  src={formData.conclusion.image}
                  alt="Conclusion"
                  onRemove={() => {
                    setFormData(prev => ({
                      ...prev,
                      conclusion: { ...prev.conclusion, image: '' }
                    }));
                  }}
                />
              </div>
              <div className="p-4 mb-25 border-t dark:border-gray-700">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full px-4 py-2 bg-green-600 text-gray-800 dark:text-white rounded hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 disabled:opacity-50 dark:disabled:opacity-40"
                >
                  {formLoading ? (editingId ? 'Updating...' : 'Creating...') : (editingId ? 'Update Blog' : 'Create Blog')}
                </button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Blog;