import { useActionState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import InputField from './input-fields/InputField';
import SubmitButton from '../buttons/submit-button/SubmitButton';
import { login } from '../../services/auth.service';
import { ApiError } from '../../errors/apiError';
import type { LoginDto } from '../../interfaces/auth.type';
import { useAuth } from '../../context/AuthContext';
import { validateLoginForm, type ValidationErrors } from '../../utils/validations';

interface FormState {
  error: string | null;
  success: boolean;
  validationErrors: ValidationErrors;
  formData: {
    email: string;
    password: string;
  };
}

const LogInForm = () => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [state, formAction] = useActionState(loginAction, { 
    error: null, 
    success: false, 
    validationErrors: {},
    formData: { email: '', password: '' }
  });

  async function loginAction(_previousState: FormState, formData: FormData): Promise<FormState> {
    const email = (formData.get('email') as string) || '';
    const password = (formData.get('password') as string) || '';
    
    // Guardar los datos del formulario para mantenerlos en caso de error
    const currentFormData = { email, password };
    
    const validationErrors = validateLoginForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      return {
        error: null,
        success: false,
        validationErrors,
        formData: currentFormData
      };
    }

    const loginData: LoginDto = { email, password };

    try {
      const response = await login(loginData);

      authLogin(response.token);
      
      return { 
        error: null, 
        success: true, 
        validationErrors: {},
        formData: { email: '', password: '' }
      };
    } catch (err) {
      // Mantener los datos del formulario en caso de error de API
      if (err instanceof ApiError) {
        return { 
          error: err.message, 
          success: false, 
          validationErrors: {},
          formData: currentFormData
        };
      }
      return { 
        error: 'Ocurrió un error inesperado.', 
        success: false, 
        validationErrors: {},
        formData: currentFormData
      };
    }
  }

  useEffect(() => {
    if (state.success) {
      navigate('/', { replace: true });
    }
  }, [state.success, navigate]);

  const hasValidationErrors = Object.keys(state.validationErrors).length > 0;

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-6">
      <InputField
        labelContent="Correo electrónico"
        name="email"
        type="email"
        id="email"
        placeholder="Correo electrónico"
        autoComplete="email"
        srOnly={true}
        required
        defaultValue={state.formData.email}
        error={state.validationErrors.email}
        showError={hasValidationErrors}
      />
      <InputField
        labelContent="Contraseña"
        name="password"
        type="password"
        id="password"
        placeholder="Contraseña"
        autoComplete="current-password"
        srOnly={true}
        required
        isPassword={true}
        defaultValue={state.formData.password}
        error={state.validationErrors.password}
        showError={hasValidationErrors}
      />
      
      {state.error && (
        <p className="text-destructive text-sm text-center">{state.error}</p>
      )}

      <SubmitButton loadingText="Accediendo...">Acceder</SubmitButton>
    </form>
  );
};

export default LogInForm;