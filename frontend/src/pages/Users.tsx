import { Suspense } from 'react';

import { fetchUsers } from '../actions/fetchUsers';

import UsersList from '../components/UsersList';

export type User = {
  id: number;
  name: string;
  email: string;
  city: string;
  phone_number: string;
  created_at: string;
}

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
      <UsersList usersList={fetchUsers()} />
    </Suspense>
  </div>
);

export default Users;
