import React, { useState } from 'react';
import InputField from './InputField.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Input() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8000/api/login/', // Update with your Django API endpoint
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.message === 'Login successful!') {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/user'); // Redirect to dashboard after login
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {error && (
        <div className="text-red-500 text-sm text-center">{error}</div>
      )}
      
      <InputField 
        label="Username" 
        type="text" 
        placeholder="Username"
        icon="/icons/user.svg"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <InputField 
        label="Password" 
        type="password" 
        placeholder="Password"
        icon="/icons/lock.svg"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <Link className='text-sm font-bold text-active' to="/forgot-password">
        Forgot Password?
      </Link>
      
      <button 
        className='bg-active text-white font-bold rounded-full h-[35px] hover:bg-opacity-90 transition disabled:opacity-50' 
        type="submit"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default Input;