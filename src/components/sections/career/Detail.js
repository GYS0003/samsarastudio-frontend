'use client';

import GradientButton from '@/components/ui/GradientButton';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchJobById, submitJobApplication } from '@/services/apis';

export default function JobDetail() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    portfolioLink: '',
    linkedinUrl: '',
      resume: null,
  });

  const [job, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function fetchJobData() {
      try {
        const response = await fetchJobById(id);
        setJobData(response);
      } catch (error) {
        console.error('Failed to fetch job data:', error);
      }
    }
    fetchJobData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    try {
      const submission = new FormData();
      submission.append('jobTitle', job.title);
      submission.append('fullName', formData.fullName);
      submission.append('email', formData.email);
      submission.append('phoneNumber', formData.phoneNumber);
      submission.append('portfolioLink', formData.portfolioLink);
      submission.append('linkedinUrl', formData.linkedinUrl);
      submission.append('resume', formData.resume);

      await submitJobApplication(submission);
      setSuccessMsg('Application submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        portfolioLink: '',
        linkedinUrl: '',
        githubUrl: '',
        resume: null,
      });
    } catch (err) {
      console.error('Application error:', err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <p className="text-center mt-16">Loading...</p>;
  }

  return (
    <section className="relative z-10 p-4 pt-16 md:p-16 text-black dark:text-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{job.location}</p>
        <div className="mt-4 flex justify-center items-center gap-4">
          <GradientButton as="link" href="#apply">
            Apply Now
          </GradientButton>
        </div>
      </div>

      <div className="grid md:grid-cols-6 gap-8">
        <div className="md:col-span-4 space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
            <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Key Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {job.responsibilities?.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-2">Preferred Qualifications</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {job.qualifications?.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
          </section>
        </div>

        <aside className="md:col-span-2 bg-gray-100 dark:bg-white/5 p-6 rounded-lg text-sm">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            <div className="space-y-4 pr-2">
              <p><strong>Job Title:</strong></p>
              <p><strong>Position Type:</strong></p>
              <p><strong>Job ID:</strong></p>
              <p><strong>Career Area:</strong></p>
              <p><strong>Location:</strong></p>
            </div>
            <div className="space-y-4 pl-2 text-gray-700 dark:text-gray-200">
              <p>{job.title}</p>
              <p>{job.type}</p>
              <p>{job.id}</p>
              <p>{job.stack}</p>
              <p>{job.location}</p>
            </div>
          </div>
          <section>
            <h2 className="text-lg font-semibold mt-8 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {job.benefits?.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </section>
        </aside>
      </div>

      <div id="apply" className="mt-16 w-full max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center">Apply Now</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 rounded-lg shadow-sm"
        >
          {[
            { name: 'fullName', placeholder: 'Full Name', required: true },
            { name: 'email', type: 'email', placeholder: 'Email', required: true },
            { name: 'phoneNumber', placeholder: 'Phone Number', required: true },
            { name: 'portfolioLink', placeholder: 'Portfolio Link' },
            { name: 'linkedinUrl', placeholder: 'LinkedIn URL' },
          ].map((field, i) => (
            <input
              key={i}
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required || false}
              className="w-full p-3 border border-gray-300 dark:border-white/20 rounded bg-white dark:bg-transparent text-black dark:text-white"
            />
          ))}

          <input
            type="file"
            name="resume"
            accept=".pdf"
            required
            onChange={handleChange}
            className="col-span-full p-3 border border-gray-300 dark:border-white/20 rounded bg-white dark:bg-transparent text-black dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
        {successMsg && <p className="text-green-500 text-center mt-4">{successMsg}</p>}
      </div>

    </section>
  );
}
