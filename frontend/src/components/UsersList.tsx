import { use, useState } from 'react';

import type { User } from '../pages/Users';

import UserCard from './UserCard';

const UsersList = ({ usersPromise }: { usersPromise: Promise<User[]> }) => {
  const allUsers = use(usersPromise);
  const [users, setUsers] = useState(allUsers);

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

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
            <UserCard key={user.id} user={user} onDelete={handleDelete} />
          ))
        )}
      </div>
    </>
  );
}

export default UsersList;
