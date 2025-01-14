export default function SignUpModal({ isOpen, onClose }) {
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
          <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
          <form>
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
  