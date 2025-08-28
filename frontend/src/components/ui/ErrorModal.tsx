import Modal from './Modal';
import BaseButton from '../buttons/BaseButton';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const ErrorModal = ({ 
  isOpen, 
  onClose, 
  title = "Error",
  message = "Ha ocurrido un error inesperado.",
  buttonText = "Cerrar"
}: ErrorModalProps) => {
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <BaseButton onClick={onClose}>
          {buttonText}
        </BaseButton>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-medium text-fg">
              {message}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
