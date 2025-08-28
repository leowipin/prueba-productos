import { useState, useEffect } from 'react';
import { LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/product.service';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../interfaces/product.type';
import ProductList from '../components/ProductList';
import ProductForm from '../components/forms/ProductForm';
import Modal from '../components/ui/Modal';
import ConfirmDeleteModal from '../components/ui/ConfirmDeleteModal';
import SuccessModal from '../components/ui/SuccessModal';
import ErrorModal from '../components/ui/ErrorModal';
import { ApiError } from '../errors/apiError';
import BaseButton from '../components/buttons/BaseButton';

const HomePage = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  // Messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setProductsLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      if (error instanceof ApiError) {
        setErrorTitle(error.title);
        setErrorMessage(error.description);
        setShowErrorModal(true);
      }
    } finally {
      setProductsLoading(false);
      setInitialLoading(false);
    }
  };

  const handleCreateProduct = async (formData: FormData) => {
    try {
      const productData: CreateProductRequest = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        price: parseFloat(formData.get('price') as string)
      };

      await productService.createProduct(productData);
      setShowCreateModal(false);
      setSuccessMessage('Producto creado exitosamente');
      setShowSuccessModal(true);
      loadProducts();
    } catch (error) {
      console.error('Error creating product:', error);
      if (error instanceof ApiError) {
        setErrorTitle(error.title);
        setErrorMessage(error.description);
        setShowErrorModal(true);
      }
    }
  };

  const handleEditProduct = async (formData: FormData) => {
    if (!selectedProduct) return;

    try {
      const updateData: UpdateProductRequest = {};
      
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const price = parseFloat(formData.get('price') as string);

      // Solo incluir campos que han cambiado
      if (name !== selectedProduct.name) {
        updateData.name = name;
      }
      if (description !== selectedProduct.description) {
        updateData.description = description;
      }
      if (price !== parseFloat(selectedProduct.price)) {
        updateData.price = price;
      }

      if (Object.keys(updateData).length === 0) {
        setShowEditModal(false);
        return;
      }

      await productService.updateProduct(selectedProduct.id, updateData);
      setShowEditModal(false);
      setSelectedProduct(null);
      setSuccessMessage('Producto actualizado exitosamente');
      setShowSuccessModal(true);
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      if (error instanceof ApiError) {
        setErrorTitle(error.title);
        setErrorMessage(error.description);
        setShowErrorModal(true);
      }
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      await productService.deleteProduct(selectedProduct.id);
      setShowDeleteModal(false);
      setSelectedProduct(null);
      setSuccessMessage('Producto eliminado exitosamente');
      setShowSuccessModal(true);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      if (error instanceof ApiError) {
        setErrorTitle(error.title);
        setErrorMessage(error.description);
        setShowErrorModal(true);
      }
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-fg-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-2">
      {/* Header */}
      <header className="bg-surface border-b border-surface-2 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-fg">
                Bienvenido, {user?.username}
              </h1>
              <p className="text-sm text-fg-muted">
                Rol: {user?.role}
              </p>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 text-fg-muted hover:text-fg transition-colors"
              aria-label="Cerrar sesión"
            >
              <LogOut size={20} />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-fg">Productos</h2>
          <BaseButton
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nuevo Producto</span>
          </BaseButton>
        </div>

        <ProductList
          products={products}
          loading={productsLoading}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </main>

      {/* Modals */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Crear Nuevo Producto"
      >
        <ProductForm
          onSubmit={handleCreateProduct}
          buttonText="Crear Producto"
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProduct(null);
        }}
        title="Editar Producto"
      >
        <ProductForm
          onSubmit={handleEditProduct}
          initialData={selectedProduct}
          buttonText="Actualizar Producto"
        />
      </Modal>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
        title="Confirmar Eliminación"
        message={`¿Estás seguro de que deseas eliminar el producto "${selectedProduct?.name}"?`}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title={errorTitle}
        message={errorMessage}
      />
    </div>
  );
};

export default HomePage;