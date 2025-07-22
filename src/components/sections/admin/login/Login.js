'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdmin } from '@/services/apis'; // should return Axios response

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await verifyAdmin(form.email, form.password);

      sessionStorage.setItem('Token', response.token);
      setError('');
      router.push('/adminsamsarastudio/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      setError(err?.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl max-w-sm w-full shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Admin Email"
          className="w-full mb-4 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-800 
             text-gray-800 dark:text-white 
             placeholder-gray-500 dark:placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
             transition-colors duration-200"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-800 
             text-gray-800 dark:text-white 
             placeholder-gray-500 dark:placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
             transition-colors duration-200"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold py-2 rounded transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
