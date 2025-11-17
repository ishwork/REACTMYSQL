import type { User } from '../types/user';

type ActionState = {
  success: boolean;
  message: string;
  error?: string;
  updatedData?: Omit<User, 'id' | 'created_at'>;
};

export async function updateUserAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const userId = formData.get('userId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const city = formData.get('city') as string;
    const phone_number = formData.get('phone_number') as string;

    if (!userId) {
      return {
        success: false,
        message: '',
        error: 'User ID is required',
      };
    }

    if (!name || !email) {
      return {
        success: false,
        message: '',
        error: 'Name and email are required',
      };
    }

    const userData = { name, email, city, phone_number };

    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: '',
        error: data.message || 'Failed to update user',
      };
    }

    return {
      success: true,
      message: 'User updated successfully!',
      updatedData: userData,
    };
  } catch (error) {
    return {
      success: false,
      message: '',
      error:
        error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
