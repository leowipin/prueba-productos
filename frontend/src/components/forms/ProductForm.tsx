import { useState } from 'react';
import InputField from './input-fields/InputField';
import SubmitButton from '../buttons/submit-button/SubmitButton';
import type { ValidationErrors } from '../../utils/validations';
import { validateProductForm } from '../../utils/validations';
import type { Product } from '../../interfaces/product.type';

interface ProductFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  initialData?: Product | null;
  buttonText?: string;
}

const ProductForm = ({ 
  onSubmit, 
  initialData = null, 
  buttonText = "Guardar Producto"
}: ProductFormProps) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = async (formData: FormData) => {
    const validationErrors = validateProductForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    await onSubmit(formData);
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <InputField
        id="name"
        name="name"
        type="text"
        labelContent="Nombre del producto"
        placeholder="Ingresa el nombre del producto"
        defaultValue={initialData?.name || ''}
        error={errors.name}
        showError={!!errors.name}
        required
      />
      
      <InputField
        id="description"
        name="description"
        type="text"
        labelContent="Descripción (opcional)"
        placeholder="Ingresa la descripción del producto"
        defaultValue={initialData?.description || ''}
        error={errors.description}
        showError={!!errors.description}
      />
      
      <InputField
        id="price"
        name="price"
        type="number"
        labelContent="Precio"
        placeholder="0.00"
        step="0.01"
        min="0"
        max="99999999.99"
        defaultValue={initialData ? parseFloat(initialData.price).toFixed(2) : ''}
        error={errors.price}
        showError={!!errors.price}
        required
      />
      
      <SubmitButton loadingText="Guardando...">
        {buttonText}
      </SubmitButton>
    </form>
  );
};

export default ProductForm;
