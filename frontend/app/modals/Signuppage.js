import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignUpModal({ isOpen, onClose, onOpenLogin }) {
  if (!isOpen) return null;

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = data;

    // Basic validation
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post('/register', { name, email, password });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Registration successful');
        setData({ name: '', email: '', password: '', confirmPassword: '' });
        onOpenLogin(); // Open login modal after successful registration
        onClose(); // Close sign-up modal
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-tele text-white py-2 rounded hover:bg-tele-dark"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
