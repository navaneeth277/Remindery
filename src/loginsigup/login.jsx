import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react'; // Using lucide-react icon library for chatbot icon

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-sky-100 p-8 w-full max-w-md relative">
        {/* Chatbot Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-sky-100 text-sky-600 p-3 rounded-full shadow-inner">
            <Bot size={32} />
          </div>
        </div>

        {/* Speech Bubble Style Header */}
        <h2 className="text-xl text-center text-sky-600 font-bold relative mb-6">
          <span className="inline-block bg-sky-100 px-4 py-2 rounded-full shadow text-sky-700">
            Hello again! Let’s chat 💬
          </span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder-gray-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">New here?</p>
          <button
            onClick={handleSignupRedirect}
            className="mt-1 text-sky-600 hover:underline font-medium"
          >
            Create an Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
