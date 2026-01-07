import { Suspense } from 'react';

import { fetchUsers } from '../actions/fetchUsers';

import UsersList from '../components/UsersList';

const Users = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
      Users Directory
    </h1>

    <Suspense
      fallback={
        <div className="text-center text-2xl text-gray-600 py-16">
          Loading users...
        </div>
      }
    >
      {/* fetchUsers() returns a Promise that UsersList unwraps with use() API */}
      <UsersList usersPromise={fetchUsers()} />
    </Suspense>
  </div>
);

export default Users;
