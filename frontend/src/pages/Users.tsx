import UsersList from '../components/UsersList';

const Users = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        Users Directory
      </h1>

      <UsersList />
    </div>
  );
};

export default Users;
