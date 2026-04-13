export const nameValidation = {
  required: 'Name is required',
  minLength: { value: 2, message: 'Name must be at least 2 characters' },
  maxLength: { value: 100, message: 'Name must be under 100 characters' },
  pattern: {
    value: /^[A-Za-z\s]+$/,
    message: 'Name must contain only letters',
  },
};

export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address',
  },
};

export const phoneValidation = {
  pattern: {
    value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
    message: 'Enter a valid phone number',
  },
};
