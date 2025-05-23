import React from "react";
import {Edit, Trash2, Package} from 'lucide-react';

const ProductCard = ({product, onEdit, onDelete}) => {
    const handleDelete = () => {
        if(window.confirm(`¿Estás seguro de que deseas eliminar "${product.name}"?`)){
            onDelete(product._id);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(price);
    };

    return(
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="absolute inset-0 bg-gray-200 flex items-center justify-center"
          style={{ display: product.image ? 'none' : 'flex' }}
        >
          <Package className="w-16 h-16 text-gray-400" />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            title="Editar producto"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            title="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold text-green-600">
            {formatPrice(product.price)}
          </span>
          <span className={`text-sm px-2 py-1 rounded-full ${
            product.stock > 10 
              ? 'bg-green-100 text-green-800'
              : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            Stock: {product.stock}
          </span>
        </div>
        
        <div className="text-xs text-gray-500">
          {product.createdAt && (
            <span>Agregado: {new Date(product.createdAt).toLocaleDateString('es-CO')}</span>
          )}
        </div>
      </div>
    </div>
    );
};

export default ProductCard;