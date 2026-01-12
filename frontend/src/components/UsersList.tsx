import { useCallback, useEffect, useState } from 'react';

import type { User } from '../types/user';
import { fetchUsers } from '../actions/fetchUsers';

import UserCard from './UserCard';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = useCallback((userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }, []);

  const handleUpdate = useCallback((updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  }, []);

  if (loading) {
    return (
      <div className="text-center text-2xl text-gray-600 py-16">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl text-red-600 py-16">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Total Users: {users.length}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {users.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-500 py-16">
            No users found. Add some users to get started!
          </p>
        ) : (
          users.map((user: User) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </>
  );
};

export default UsersList;
