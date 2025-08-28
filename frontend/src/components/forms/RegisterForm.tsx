import { useActionState, useRef } from 'react';
import InputField from './input-fields/InputField';
import SubmitButton from '../buttons/submit-button/SubmitButton';
import { register } from '../../services/auth.service';
import { ApiError } from '../../errors/apiError';
import type { RegisterDto } from '../../interfaces/auth.type';
import { validateRegisterForm, type ValidationErrors } from '../../utils/validations';

interface FormState {
  message: string | null;
  type: 'success' | 'error' | null;
  validationErrors: ValidationErrors;
  formData: {
    email: string;
    username: string;
    password: string;
  };
}

const RegisterForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [state, formAction] = useActionState(registerAction, { 
    message: null, 
    type: null, 
    validationErrors: {},
    formData: { email: '', username: '', password: '' }
  });

  async function registerAction(_previousState: FormState, formData: FormData): Promise<FormState> {
    const email = (formData.get('email') as string) || '';
    const username = (formData.get('username') as string) || '';
    const password = (formData.get('password') as string) || '';
    
    // Guardar los datos del formulario para mantenerlos en caso de error
    const currentFormData = { email, username, password };
    
    const validationErrors = validateRegisterForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      return {
        message: null,
        type: null,
        validationErrors,
        formData: currentFormData
      };
    }

    const registerData: RegisterDto = { email, username, password };

    try {
      await register(registerData);
      return { 
        message: '¡Cuenta creada exitosamente! Por favor, inicia sesión.',
        type: 'success',
        validationErrors: {},
        formData: { email: '', username: '', password: '' }
      };
    } catch (err) {
      // Mantener los datos del formulario en caso de error de API
      if (err instanceof ApiError) {
        return { 
          message: err.message, 
          type: 'error', 
          validationErrors: {},
          formData: currentFormData
        };
      }
      return { 
        message: 'Ocurrió un error inesperado.', 
        type: 'error', 
        validationErrors: {},
        formData: currentFormData
      };
    }
  }

  const hasValidationErrors = Object.keys(state.validationErrors).length > 0;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      <InputField
        labelContent="Correo electrónico"
        name="email"
        type="email"
        id="email"
        placeholder="tu@correo.com"
        autoComplete="email"
        srOnly={true}
        required
        defaultValue={state.formData.email}
        error={state.validationErrors.email}
        showError={hasValidationErrors}
      />
      <InputField
        labelContent="Nombre de usuario"
        name="username"
        type="text"
        id="username"
        placeholder="Nombre de usuario"
        autoComplete="username"
        srOnly={true}
        required
        defaultValue={state.formData.username}
        error={state.validationErrors.username}
        showError={hasValidationErrors}
      />
      <InputField
        labelContent="Contraseña"
        name="password"
        type="password"
        id="password"
        placeholder="Contraseña"
        autoComplete="new-password"
        srOnly={true}
        required
        isPassword={true}
        defaultValue={state.formData.password}
        error={state.validationErrors.password}
        showError={hasValidationErrors}
      />
      
      {state.message && (
        <p className={`text-sm text-center ${state.type === 'success' ? 'text-success' : 'text-destructive'}`}>
          {state.message}
        </p>
      )}

      <SubmitButton loadingText="Creando cuenta...">Crear Cuenta</SubmitButton>
    </form>
  );
};

export default RegisterForm;