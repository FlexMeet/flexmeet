import { useState } from "react";
import axios from 'axios';

export default function LoginModal({ isOpen, onClose, onOpenSignUp }) {
  const [data, setData] = useState({ email: '', password: '' });

  const loginUser = (e) => {
    e.preventDefault();
    console.log('Logging in user...');
    axios.get('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>

        <form onSubmit={loginUser}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele pr-10"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-tele text-white py-2 rounded hover:bg-tele-dark"
          >
            Log In
          </button>
          <div className="mb-4 mt-4 text-center">
            <span className="text-sm text-gray-700">
              Don't have an account? Sign up{" "}
              <span
                onClick={onOpenSignUp}
                className="text-tele cursor-pointer hover:underline"
              >
                here
              </span>
              !
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
