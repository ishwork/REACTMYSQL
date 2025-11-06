import { Link } from 'react-router-dom';
import { useActionState, useEffect } from 'react';
import { createUserAction } from '../actions/userActions';

const initialState = {
  success: false,
  message: null,
  error: null,
};

const Home = () => {
  const [state, formAction, isPending] = useActionState(createUserAction, initialState);

  useEffect(() => {
    if (state.success && state.message) {
      // Reset form on success - the form will automatically reset via key prop
    }
  }, [state.success, state.message]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Welcome to User Management System
        </h1>
        
        <div className="mb-12">
          <Link 
            to="/users" 
            className="inline-block px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            View All Users
          </Link>
        </div>
      </div>

      {/* Add User Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New User</h2>
        
        {state.message && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
            {state.message}
          </div>
        )}

        {state.error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-6" key={state.success ? Date.now() : undefined}>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter phone number"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating...' : 'Create User'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
