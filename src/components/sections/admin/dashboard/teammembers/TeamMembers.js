'use client';

import React, { useEffect, useState } from 'react';
import {
  getTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '@/services/apis';

const initialForm = {
  name: '',
  designation: '',
  linkedin: '',
  instagram: '',
};

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const data = await getTeam();
      setMembers(data);
    } catch (err) {
      setMessage(err.message || 'Failed to fetch team members.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('designation', formData.designation);
      formPayload.append('linkedin', formData.linkedin);
      formPayload.append('instagram', formData.instagram);
      if (imageFile) formPayload.append('image', imageFile);

      if (editingId) {
        await updateTeamMember(editingId, formPayload);
        setMessage('Team member updated');
      } else {
        await createTeamMember(formPayload);
        setMessage('Team member created');
      }

      // Reset
      setFormData(initialForm);
      setImageFile(null);
      setImagePreview(null);
      setEditingId(null);
      fetchTeam();
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setMessage(err.message || 'Operation failed.');
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      designation: member.designation,
      linkedin: member.linkedin,
      instagram: member.instagram,
    });
    setImagePreview(member.imageUrl || null);
    setEditingId(member._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await deleteTeamMember(id);
        setMessage('Member deleted');
        fetchTeam();
      } catch (err) {
        setMessage(err.message || 'Delete failed');
      }
    }
  };

  const handleCancel = () => {
    setFormData(initialForm);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 pt-16  text-gray-900 dark:text-white rounded-md shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Our Team</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          required
          value={formData.designation}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram URL"
          value={formData.instagram}
          onChange={handleChange}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="col-span-full border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="h-16 w-16 object-cover rounded-full border mt-1"
          />
        )}

        <div className="col-span-full flex justify-end gap-3">
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
         {!loading? (<button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editingId ? 'Update' : 'Create'}
          </button>):(
            <button
              className="bg-blue-400 text-white px-4 py-2 rounded cursor-not-allowed"
            >
              Loading...
            </button>
          )}
        </div>
      </form>

      {/* Message */}
      {message && (
        <p className="text-center text-blue-600 dark:text-blue-300 mb-4">{message}</p>
      )}

      {/* Table */}
      {loading ? (
        <p className="text-center">Loading team members...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700 dark:text-white">
              <tr>
                <th className="p-2 border dark:border-gray-600">Image</th>
                <th className="p-2 border dark:border-gray-600">Name</th>
                <th className="p-2 border dark:border-gray-600">Designation</th>
                <th className="p-2 border dark:border-gray-600">LinkedIn</th>
                <th className="p-2 border dark:border-gray-600">Instagram</th>
                <th className="p-2 border dark:border-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="text-center dark:text-white">
                  <td className="p-2 border dark:border-gray-700">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-12 w-12 object-cover rounded-full mx-auto"
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="p-2 border dark:border-gray-700">{member.name}</td>
                  <td className="p-2 border dark:border-gray-700">{member.designation}</td>
                  <td className="p-2 border dark:border-gray-700">
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        className="text-blue-500 underline"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-2 border dark:border-gray-700">
                    {member.instagram ? (
                      <a
                        href={member.instagram}
                        target="_blank"
                        className="text-pink-500 underline"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="text-blue-500 border border-blue-600 hover:bg-blue-100 px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="text-red-500 border border-red-600 hover:bg-red-100 px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500 dark:text-gray-300">
                    No team members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TeamMembers;
