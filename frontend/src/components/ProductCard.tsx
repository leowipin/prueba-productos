import { Edit2, Trash2 } from 'lucide-react';
import type { Product } from '../interfaces/product.type';
import productoGenerico from '../assets/images/producto-generico.jpg';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const imageUrl = product.imageUrl || productoGenerico;

  return (
    <div className="bg-surface border border-surface-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = productoGenerico;
          }}
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="p-2 bg-surface rounded-full shadow-sm hover:bg-surface-2 transition-colors"
            aria-label="Editar producto"
          >
            <Edit2 size={16} className="text-primary" />
          </button>
          <button
            onClick={() => onDelete(product)}
            className="p-2 bg-surface rounded-full shadow-sm hover:bg-surface-2 transition-colors"
            aria-label="Eliminar producto"
          >
            <Trash2 size={16} className="text-destructive" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-fg mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-fg-muted text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <span className="text-xs text-fg-muted-2">
            {new Date(product.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
