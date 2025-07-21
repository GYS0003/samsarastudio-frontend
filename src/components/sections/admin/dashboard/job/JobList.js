'use client';

import React, { useEffect, useState } from 'react';
import { getJobApplications, deleteJobAplication } from '@/services/apis';

const JobList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchApplications = async () => {
    try {
      const data = await getJobApplications();
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this application?');
    if (!confirmDelete) return;

    try {
      await deleteJobAplication(id);
      fetchApplications(); // Refresh list after deletion
    } catch (err) {
      console.error('Failed to delete application:', err);
      alert('Failed to delete application');
    }
  };

  return (
    <section className="pt-16 px-4 md:px-12 max-w-6xl mx-auto text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Job Applications</h2>

      {loading && <p className="text-gray-600 dark:text-gray-300">Loading applications...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && applications.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No applications found.</p>
      )}

      <div className="overflow-auto">
        <table className="min-w-full table-auto border border-gray-300 dark:border-white/10 text-sm text-left">
          <thead className="bg-gray-100 dark:bg-white/10 text-black dark:text-white">
            <tr>
              <th className="p-2 border dark:border-white/10">Job Title</th>
              <th className="p-2 border dark:border-white/10">Full Name</th>
              <th className="p-2 border dark:border-white/10">Email</th>
              <th className="p-2 border dark:border-white/10">Phone</th>
              <th className="p-2 border dark:border-white/10">Portfolio</th>
              <th className="p-2 border dark:border-white/10">LinkedIn</th>
              <th className="p-2 border dark:border-white/10">Resume</th>
              <th className="p-2 border dark:border-white/10">Submitted At</th>
              <th className="p-2 border dark:border-white/10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t dark:border-white/10">
                <td className="p-2 border dark:border-white/10">{app.jobTitle}</td>

                <td className="p-2 border dark:border-white/10">{app.fullName}</td>
                <td className="p-2 border dark:border-white/10">{app.email}</td>
                <td className="p-2 border dark:border-white/10">{app.phoneNumber}</td>
                <td className="p-2 border dark:border-white/10">
                  {app.portfolioLink ? (
                    <a href={app.portfolioLink} target="_blank" className="text-blue-600 dark:text-blue-400 underline">
                      Link
                    </a>
                  ) : '—'}
                </td>
                <td className="p-2 border dark:border-white/10">
                  {app.linkedinUrl ? (
                    <a href={app.linkedinUrl} target="_blank" className="text-blue-600 dark:text-blue-400 underline">
                      LinkedIn
                    </a>
                  ) : '—'}
                </td>
             
                <td className="p-2 border dark:border-white/10">
                  {app.resumeUrl ? (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      className="text-green-600 dark:text-green-400 underline"
                    >
                      Download
                    </a>
                  ) : 'N/A'}
                </td>
                <td className="p-2 border dark:border-white/10">{new Date(app.createdAt).toLocaleString()}</td>
                <td className="p-2 border dark:border-white/10">
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="text-red-600 dark:text-red-400 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default JobList;
