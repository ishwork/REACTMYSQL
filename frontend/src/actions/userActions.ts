type ActionState = {
  success: boolean;
  message: string | null;
  error: string | null;
};

// Server action for creating a user
export const createUserAction = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const city = formData.get('city') as string;
  const phone_number = formData.get('phone_number') as string;

  try {
    const response = await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, city, phone_number }),
    });

    const data = await response.json();

    if (data.success) {
      return {
        ...prevState,
        success: true,
        message: 'User created successfully!',
        error: null,
      };
    } else {
      return {
        ...prevState,
        success: false,
        message: null,
        error: data.message || 'Failed to create user',
      };
    }
  } catch {
    return {
      ...prevState,
      success: false,
      message: null,
      error: 'Error connecting to server',
    };
  }
};
