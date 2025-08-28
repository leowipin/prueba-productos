import { useFormStatus } from 'react-dom';
import BaseButton from '../BaseButton';
import type { SubmitButtonProps } from './submitButtonProps';

const SubmitButton = ({ children, loadingText = 'Enviando...', ...rest }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <BaseButton type="submit" disabled={pending} {...rest}>
      {pending ? loadingText : children}
    </BaseButton>
  );
};

export default SubmitButton;