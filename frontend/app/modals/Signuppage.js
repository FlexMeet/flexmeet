import { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast"

export default function SignUpModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const {data} = await axios.post("/register", {name, email, password});
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("login successful");
        // TODO: close the modal
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        <form onSubmit={registerUser}>
        <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Choose a username"
              value={data.name}
              onChange = {(e) => setData({...data, name: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Enter your email"
              value={data.email}
              onChange = {(e) => setData({...data, email: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Enter your password"
              
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele"
              placeholder="Enter your password again"
              value={data.password}
              onChange = {(e) => setData({...data, password: e.target.value})}
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
  