import React, { useState, useEffect } from "react";
import { Plus, Search, Package, AlertCircle } from 'lucide-react';
import ProductCard from "../components/ProductCard";
import Header from '../components/Header';

const Products = ({ onLogOut, onNavigateToBrands, onNavigateToProviders }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null
    });

    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:4000/api/products');
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }

            const data = await response.json();
            setProducts(data);
            setError('');
        } catch (error) {
            setError('Error al cargar productos: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async () => {
        if (!formData.name || !formData.price || !formData.stock) {
            setError('Los campos marcados con * son obligatorios');
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', parseFloat(formData.price));
            formDataToSend.append('stock', parseInt(formData.stock));

            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch('http://localhost:4000/api/products', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Error al agregar producto');
            }

            const newProduct = await response.json();
            setProducts([newProduct, ...products]);
            setShowAddModal(false);
            resetForm();
            setError('');
        } catch (error) {
            setError('Error al agregar producto: ' + error.message);
        }
    };

    const handleEditProduct = async () => {
        if (!formData.name || !formData.price || !formData.stock) {
            setError('Los campos marcados con * son obligatorios');
            return;
        }

        try {

            const forDataToSend = new FormData();
            forDataToSend.append('name', formData.name);
            forDataToSend.append('description', formData.description);
            forDataToSend.append('price', parseFloat(formData.price));
            forDataToSend.append('stock', parseInt(formData.stock));

            if (formData.image) {
                forDataToSend.append('image', formData.image);
            }

            const response = await fetch(`http://localhost:4000/api/products/${editingProduct._id}`, {
                method: 'PUT',
                body: forDataToSend,
            });

            if (!response.ok) {
                throw new Error('Error al actualizar producto');
            }

            const updatedProduct = await response.json();
            setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
            setEditingProduct(null);
            resetForm();
            setError('');
        } catch (error) {
            setError('Error al actualizar producto: ' + error.message);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error al eliminar producto');
            }

            setProducts(products.filter(p => p._id !== productId));
            setError('');
        } catch (error) {
            setError('Error al eliminar producto: ' + error.message);
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            stock: product.stock.toString(),
            image: null
        });
        setImagePreview(product.image || '');
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            image: null
        });
        setImagePreview('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                setError('Solo se permiten archivos JPG, JPEG, PNG');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setError('El archivo deber ser menor a 5MB');
                return;
            }

            setFormData({ ...formData, image: file });

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const closeModals = () => {
        setShowAddModal(false);
        setEditingProduct(null);
        resetForm();
        setError('');
    };

    const filteredProducts = products.filter(product =>
        product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onLogOut={onLogOut} onNavigateToProducts={() => {}} onNavigateToBrands={(onNavigateToBrands)} onNavigateToProviders={onNavigateToProviders} currentPage={"products"}/>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                        <Plus className="w-5 h-5" />
                        Agregar Producto
                    </button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm ? 'No se encontraron productos' : 'No hay productos'}
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm
                                ? 'Intenta con otros términos de búsqueda'
                                : 'Comienza agregando tu primer producto'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onEdit={openEditModal}
                                onDelete={handleDeleteProduct}
                            />
                        ))}
                    </div>
                )}
            </main>

            {(showAddModal || editingProduct) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
                            </h2>

                            <div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nombre *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Descripción
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Precio *
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                step="0.01"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Stock *
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Imagen del Producto
                                        </label>
                                        <div className="space-y-3">
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/jpg,image/png"
                                                onChange={handleImageChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            {imagePreview && (
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="w-full h-32 object-cover rounded-lg border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setImagePreview('');
                                                            setFormData({ ...formData, image: null });
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                            <p className="text-xs text-gray-500">
                                                Formatos permitidos: JPG, JPEG, PNG. Tamaño máximo: 5MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeModals}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={editingProduct ? handleEditProduct : handleAddProduct}
                                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                    >
                                        {editingProduct ? 'Actualizar' : 'Agregar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;