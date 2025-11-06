import { cache } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  city: string;
  phone_number: string;
  created_at: string;
}

const fetchUsersFromAPI = async (): Promise<User[]> => {
  try {
    const response = await fetch('http://localhost:5000/api/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error('Failed to fetch users');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUsers = cache(fetchUsersFromAPI);
