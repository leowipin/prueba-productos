export interface ValidationErrors {
  email?: string;
  username?: string;
  password?: string;
}

export const validateEmail = (email: string): string | undefined => {
  if (!email) {
    return 'El correo electrónico es requerido';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Ingresa un correo electrónico válido';
  }
  
  return undefined;
};

export const validateUsername = (username: string): string | undefined => {
  if (!username) {
    return 'El nombre de usuario es requerido';
  }
  
  if (username.trim().length < 3) {
    return 'El nombre de usuario debe tener al menos 3 caracteres';
  }
  
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return 'La contraseña es requerida';
  }
  
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  
  return undefined;
};

export const validateLoginForm = (formData: FormData): ValidationErrors => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const errors: ValidationErrors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateRegisterForm = (formData: FormData): ValidationErrors => {
  const email = formData.get('email') as string;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  
  const errors: ValidationErrors = {};
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const usernameError = validateUsername(username);
  if (usernameError) errors.username = usernameError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};
