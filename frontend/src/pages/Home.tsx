import { Link } from 'react-router';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createUserAction } from '@/actions/userActions';
import {
  nameValidation,
  emailValidation,
  phoneValidation,
} from '@/libs/validation';

type UserFormValues = {
  name: string;
  email: string;
  city: string;
  phone_number: string;
};

const initialState = {
  success: false,
  message: null,
  error: null,
};

const Home = () => {
  const [state, formAction, isPending] = useActionState(
    createUserAction,
    initialState
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>();

  useEffect(() => {
    if (state.success) {
      reset();
    }
  }, [state.success, reset]);

  const onSubmit = (data: UserFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('city', data.city ?? '');
    formData.append('phone_number', data.phone_number ?? '');
    formAction(formData);
  };

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
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add New User
        </h2>

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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register('name', nameValidation)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
                errors.name
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              {...register('email', emailValidation)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
                errors.email
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register('city')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              {...register('phone_number', phoneValidation)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition ${
                errors.phone_number
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
              placeholder="Enter phone number"
            />
            {errors.phone_number && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phone_number.message}
              </p>
            )}
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
