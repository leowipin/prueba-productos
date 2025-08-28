export interface ValidationErrors {
  email?: string;
  username?: string;
  password?: string;
  name?: string;
  description?: string;
  price?: string;
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

export const validateProductName = (name: string): string | undefined => {
  if (!name) {
    return 'El nombre del producto es requerido';
  }
  
  if (name.trim().length === 0) {
    return 'El nombre del producto no puede estar vacío';
  }
  
  if (name.length > 255) {
    return 'El nombre del producto no puede tener más de 255 caracteres';
  }
  
  return undefined;
};

export const validateProductPrice = (price: string): string | undefined => {
  if (!price) {
    return 'El precio del producto es requerido';
  }
  
  const numericPrice = parseFloat(price);
  
  if (isNaN(numericPrice)) {
    return 'El precio debe ser un número válido';
  }
  
  if (numericPrice <= 0) {
    return 'El precio debe ser mayor que 0';
  }
  
  const parts = price.split('.');
  if (parts[0].length > 8) {
    return 'El precio no puede tener más de 8 dígitos enteros';
  }
  
  if (parts.length > 1 && parts[1].length > 2) {
    return 'El precio no puede tener más de 2 decimales';
  }
  
  if (numericPrice > 99999999.99) {
    return 'El precio no puede ser mayor a 99,999,999.99';
  }
  
  return undefined;
};

export const validateProductForm = (formData: FormData): ValidationErrors => {
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  
  const errors: ValidationErrors = {};
  
  const nameError = validateProductName(name);
  if (nameError) errors.name = nameError;
  
  const priceError = validateProductPrice(price);
  if (priceError) errors.price = priceError;
  
  return errors;
};
