'use client';

import React, { useState, useEffect } from 'react';
import {
  getAllJobs,
  updateJob,
  deleteJob,
  createJob,
} from '@/services/apis';

const initialFormState = {
  id: '',
  title: '',
  type: '',
  location: '',
  experience: '',
  stack: '',
  description: '',
  responsibilities: [''],
  qualifications: [''],
  benefits: [''],
};

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicFieldChange = (field, index, value) => {
    const updated = [...formData[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const addField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeField = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingId(null);
    setShowPanel(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      responsibilities: formData.responsibilities.filter(Boolean),
      qualifications: formData.qualifications.filter(Boolean),
      benefits: formData.benefits.filter(Boolean),
    };

    try {
      if (editingId) {
        const updated = await updateJob(editingId, payload);
        setJobs(jobs.map((job) => (job._id === editingId ? { ...job, ...updated } : job)));
      } else {
        const created = await createJob(payload);
        setJobs([...jobs, created]);
      }
      resetForm();
    } catch (err) {
      console.error('Error submitting job:', err);
    }
  };

  const handleEdit = (job) => {
    setFormData({
      ...job,
      responsibilities: job.responsibilities || [''],
      qualifications: job.qualifications || [''],
      benefits: job.benefits || [''],
    });
    setEditingId(job._id);
    setShowPanel(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <section className="pt-20 px-4 md:px-8 lg:px-16 text-black dark:text-white relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Careers</h2>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded"
          onClick={() => {
            resetForm();
            setShowPanel(true);
          }}
        >
          Add Job
        </button>
      </div>

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border border-gray-300 dark:border-white/10 p-4 rounded-md bg-white dark:bg-gray-800"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedId(expandedId === job._id ? null : job._id)}
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  ID: {job.id} | Experience: {job.experience}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="text-blue-600 border p-1 border-blue-600 bg-blue-300/10 rounded-md font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(job);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 p-1 border border-red-600 rounded-md bg-red-400/10 font-medium"
                  onClick={(e) => {
                    console.log(job._id); // delete call
                    e.stopPropagation(); // stops parent toggle
                    handleDelete(job._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            {expandedId === job._id && (
              <div className="mt-4 text-sm space-y-2">
                <p><strong>Type:</strong> {job.type}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Stack:</strong> {job.stack}</p>
                <p><strong>Description:</strong> {job.description}</p>

                <div>
                  <p className="font-semibold">Responsibilities:</p>
                  <ul className="list-disc pl-5">{job.responsibilities.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                <div>
                  <p className="font-semibold">Qualifications:</p>
                  <ul className="list-disc pl-5">{job.qualifications.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
                <div>
                  <p className="font-semibold">Benefits:</p>
                  <ul className="list-disc pl-5">{job.benefits.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showPanel && (
        <div className="fixed top-0 right-0 pt-16 h-full w-full sm:w-[450px] bg-white dark:bg-gray-900 shadow-lg border-l border-gray-300 dark:border-gray-700 z-50 p-6 overflow-y-auto transition-transform duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{editingId ? 'Edit Job' : 'Add Job'}</h3>
            <button onClick={resetForm} className="text-gray-500 hover:text-red-600">✕</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[['id', 'Job ID'], ['title', 'Job Title'], ['type', 'Job Type'], ['location', 'Location'], ['experience', 'Experience'], ['stack', 'Tech Stack'], ['description', 'Description']].map(([name, placeholder]) => (
              <input
                key={name}
                type="text"
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'description'}
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded bg-white dark:bg-transparent"
              />
            ))}

            {['responsibilities', 'qualifications', 'benefits'].map((field) => (
              <div key={field}>
                <label className="block mb-1 font-medium capitalize">{field}</label>
                {formData[field].map((val, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => handleDynamicFieldChange(field, idx, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 dark:border-white/20 rounded bg-white dark:bg-transparent"
                    />
                    {formData[field].length > 1 && (
                      <button type="button" onClick={() => removeField(field, idx)} className="text-red-500">🗑</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addField(field)} className="text-sm text-blue-600 hover:underline">
                  + Add {field.slice(0, -1)}
                </button>
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded"
            >
              {editingId ? 'Update Job' : 'Add Job'}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default Careers;
