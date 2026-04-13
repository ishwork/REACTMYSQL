import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { User, UserFormValues } from '@/types/user';

import { updateUserAction } from '@/actions/updateUser';
import {
  nameValidation,
  emailValidation,
  phoneValidation,
} from '@/libs/validation';

type EditUserModalProps = {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
};

const initialState = {
  success: false,
  message: '',
  error: '',
};

const EditUserModal = ({ user, onClose, onUpdate }: EditUserModalProps) => {
  const [state, formAction, isPending] = useActionState(
    updateUserAction,
    initialState
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      name: user.name,
      email: user.email,
      city: user.city,
      phone_number: user.phone_number,
    },
  });

  useEffect(() => {
    if (state.success && state.updatedData) {
      const updatedUser: User = {
        ...user,
        ...state.updatedData,
      };
      onUpdate(updatedUser);
      onClose();
    }
  }, [state.success, state.updatedData, user, onUpdate, onClose]);

  const onSubmit = (data: UserFormValues) => {
    const formData = new FormData();
    formData.append('userId', String(user.id));
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('city', data.city ?? '');
    formData.append('phone_number', data.phone_number ?? '');
    formAction(formData);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {state.error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{state.error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name', nameValidation)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.name
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              {...register('email', emailValidation)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.email
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
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
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register('city')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              {...register('phone_number', phoneValidation)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${
                errors.phone_number
                  ? 'border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-purple-500'
              }`}
            />
            {errors.phone_number && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isPending ? 'Updating...' : 'Update User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
