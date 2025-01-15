import { useState } from "react";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>


export default function LoginModal({ isOpen, onClose, onOpenSignUp }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Log In</h2>

        {/* Form */}
        <form>
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
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-tele pr-10"
              placeholder="Enter your password"
            />
            {/* Toggle Icon */}
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                {isPasswordVisible ? (
                    <img
                    src="/images/eye-slash.svg"
                    alt="Hide password"
                    className="h-5 w-5"
                  />
                ) : (
                  <img
                    src="/images/eye.svg"
                    alt="Show password"
                    className="h-5 w-5"
                  />
                )}
            </button>
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
