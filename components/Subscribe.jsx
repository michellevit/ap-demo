"use client";

import React, { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({ email, firstName }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();
    if (error) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setEmail('');
    setFirstName('');
  };

  return (
    <div className="max-w-md mx-auto p-2 bg-white dark:bg-gray-800 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Subscribe to my Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter your first name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-md shadow hover:bg-blue-600"
        >
          Subscribe
        </button>
        {status === 'success' && <p className="text-green-500 text-center">Subscribed successfully!</p>}
        {status === 'error' && <p className="text-red-500 text-center">Subscription failed. Please try again.</p>}
      </form>
    </div>
  );
};

export default Subscribe;
