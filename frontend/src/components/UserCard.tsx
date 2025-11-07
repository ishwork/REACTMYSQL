import { getInitial, formatDate } from '../libs/utils';
import { useState } from 'react';

import type { User } from '../types/user';

import { deleteUser } from '../actions/deleteUser';

type UserCardProps = {
  user: User;
  onDelete: (userId: number) => void;
}

const UserCard = ({ user, onDelete }: UserCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${user.name}?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      onDelete(user.id);
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Failed to delete user: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden">
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 p-6 text-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600 text-2xl font-bold">
          {getInitial(user.name)}
        </div>
        <h3 className="text-white text-xl font-semibold">{user.name}</h3>
      </div>
      
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200">
          <span className="text-gray-600 font-medium text-sm">📧 Email:</span>
          <span className="text-gray-800 text-sm text-right break-all">{user.email}</span>
        </div>
        
        {user.city && (
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm">📍 City:</span>
            <span className="text-gray-800 text-sm">{user.city}</span>
          </div>
        )}
        
        {user.phone_number && (
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
            <span className="text-gray-600 font-medium text-sm">📞 Phone:</span>
            <span className="text-gray-800 text-sm">{user.phone_number}</span>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <span className="text-sm text-gray-500 italic">
          Added: {formatDate(user.created_at)}
        </span>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
