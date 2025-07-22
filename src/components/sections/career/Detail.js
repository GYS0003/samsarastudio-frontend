'use client';

import GradientButton from '@/components/ui/GradientButton';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { fetchJobById, submitJobApplication } from '@/services/apis';

export default function JobDetail() {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [job, setJobData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    portfolioLink: '',
    linkedinUrl: '',
    githubUrl: '',
    resume: null,
  });

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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Clear previous errors
    setErrors({});
    setFileError('');

    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      isValid = false;
    }

    // URL validations
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (formData.portfolioLink && !urlRegex.test(formData.portfolioLink)) {
      newErrors.portfolioLink = 'Please enter a valid URL';
      isValid = false;
    }

    if (formData.linkedinUrl && !formData.linkedinUrl.includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
      isValid = false;
    }

    if (formData.githubUrl && !formData.githubUrl.includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
      isValid = false;
    }

    // File validation
    if (!formData.resume) {
      setFileError('Resume is required');
      isValid = false;
    } else if (formData.resume.type !== 'application/pdf') {
      setFileError('Only PDF files are allowed');
      isValid = false;
    } else if (formData.resume.size > 5 * 1024 * 1024) { // 5MB limit
      setFileError('File size exceeds 5MB limit');
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'resume') {
      setFormData(prev => ({ ...prev, resume: files[0] }));
      if (fileError) setFileError('');
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

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
      submission.append('githubUrl', formData.githubUrl);
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

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (err) {
      console.error('Application error:', err);
      setErrors({
        submit: 'Failed to submit application. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <section className="relative z-10 p-4 pt-16 md:p-16 text-black dark:text-white">
      {/* Job Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">{job.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{job.location}</p>
        <div className="mt-6 flex justify-center">
          <GradientButton as="link" href="#apply">
            Apply Now
          </GradientButton>
        </div>
      </div>

      {/* Job Details */}
      <div className="grid md:grid-cols-6 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-4 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-300 dark:border-white/20">Job Description</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{job.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-300 dark:border-white/20">Key Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities?.map((r, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-300 dark:border-white/20">Preferred Qualifications</h2>
            <ul className="space-y-2">
              {job.qualifications?.map((q, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{q}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-2 bg-gray-50 dark:bg-white/5 p-6 rounded-lg border border-gray-200 dark:border-white/10">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Job Title</span>
              <span className="font-medium">{job.title}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Position Type</span>
              <span className="font-medium">{job.type}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Job ID</span>
              <span className="font-medium">{job.id}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Career Area</span>
              <span className="font-medium">{job.stack}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
              <span className="font-medium">{job.location}</span>
            </div>
          </div>

          <section className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
            <h2 className="text-lg font-semibold mb-3">What We Offer</h2>
            <ul className="space-y-2">
              {job.benefits?.map((b, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{b}</span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {/* Application Form */}
      <div id="apply" className="mt-16 w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Apply for {job.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Complete the form below to submit your application
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 p-6 md:p-8 rounded-xl shadow-sm"
        >
          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 mb-6">
              <p className="text-red-500 text-center">{errors.submit}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                name: 'fullName',
                placeholder: 'Full Name',
                required: true,
                error: errors.fullName
              },
              {
                name: 'email',
                type: 'email',
                placeholder: 'Email Address',
                required: true,
                error: errors.email
              },
              {
                name: 'phoneNumber',
                placeholder: 'Phone Number',
                required: true,
                error: errors.phoneNumber
              },
              {
                name: 'portfolioLink',
                placeholder: 'Portfolio Link (Optional)',
                error: errors.portfolioLink
              },
              {
                name: 'linkedinUrl',
                placeholder: 'LinkedIn URL (Optional)',
                error: errors.linkedinUrl
              },
              {
                name: 'githubUrl',
                placeholder: 'GitHub URL (Optional)',
                error: errors.githubUrl
              },
            ].map((field, i) => (
              <div key={i} className="space-y-1">
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required={field.required || false}
                  className={`w-full p-3 border ${field.error
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-white/20'
                    } rounded bg-white dark:bg-transparent text-black dark:text-white`}
                />
                {field.error && (
                  <p className="text-red-500 text-sm">{field.error}</p>
                )}
              </div>
            ))}
          </div>

          {/* Resume File Input */}
          <div className="mt-5">
            <label className="block text-sm font-medium mb-2">
              Resume (PDF only, max 5MB) <span className="text-red-500">*</span>
            </label>
            <input
              ref={fileInputRef}
              type="file"
              name="resume"
              accept=".pdf"
              onChange={handleChange}
              className={`w-full p-2 border ${fileError ? 'border-red-500' : 'border-gray-300 dark:border-white/20'
                } rounded bg-white dark:bg-transparent text-black dark:text-white`}
            />
            <p className="max-w-[350px] lg:max-w-[600px] text-xs text-white/70 mt-2">
              <em className="not-italic text-white/70">
                Note: Only upload documents stored locally on your device. Files from cloud services (e.g., Google Drive, iCloud) are not supported. The maximum allowed file size is <strong className="text-white">10MB</strong>.
              </em>
            </p>
            {fileError && (
              <p className="text-red-500 text-sm mt-1">{fileError}</p>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <GradientButton
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </GradientButton>
          </div>

          {successMsg && (
            <div className="mt-6 bg-green-500/10 border border-green-500 rounded-lg p-4">
              <p className="text-green-500 text-center font-medium">{successMsg}</p>
              <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
                {`We'll review your application and get back to you soon.`}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}