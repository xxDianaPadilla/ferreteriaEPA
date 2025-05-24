import { useState, useEffect } from "react";
import { Plus, Search, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import ProviderCard from '../components/ProviderCard';
import ProviderModal from '../components/ProviderModal';

const Providers = ({ onLogOut, onNavigateToProducts, onNavigateToBrands, userInfo }) => {
    const [providers, setProviders] = useState([]);
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProvider, setEditingProvider] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProviders();
    }, []);

    useEffect(() => {
        const filtered = providers.filter(provider =>
            provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.telephone.includes(searchTerm)
        );
        setFilteredProviders(filtered);
    }, [providers, searchTerm]);

    const fetchProviders = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/providers');
            if (!response.ok) {
                throw new Error('Error al cargar proveedores');
            }

            const data = await response.json();
            setProviders(data);
            setError(null);
        } catch (error) {
            console.error('Error al cargar proveedores: ', error);
            setError('Error al cargar proveedores');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveProvider = async (formData, providerId = null) => {
        try {
            const url = providerId ? `http://localhost:4000/api/providers/${providerId}` : 'http://localhost:4000/api/providers';
            const method = providerId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al guardar proveedor');
            }

            const savedProvider = await response.json();

            if (providerId) {
                setProviders(prev => prev.map(provider =>
                    provider._id === providerId ? savedProvider : provider
                ));
            } else {
                setProviders(prev => [...prev, savedProvider]);
            }

            setIsModalOpen(false);
            setEditingProvider(null);
        } catch (error) {
            console.error('Error al guardar proveedor:', error);
            throw error;
        }
    };

    const handleEditProvider = (provider) => {
        setEditingProvider(provider);
        setIsModalOpen(true);
    };

    const handleDeleteProvider = async (providerId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este proveedor?')) {
            try {
                const response = await fetch(`http://localhost:4000/api/providers/${providerId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar proveedor')
                }

                setProviders(prev => prev.filter(provider => provider._id !== providerId));
            } catch (error) {
                console.error('Error al eliminar proveedor: ', error);
                alert('Error al eliminar proveedor');
            }
        }
    };

    const handleAddProvider = () => {
        setEditingProvider(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProvider(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                onLogOut={onLogOut}
                onNavigateToProducts={onNavigateToProducts}
                onNavigateToBrands={onNavigateToBrands}
                onNavigateToProviders={() => { }}
                currentPage="providers"
            />
            {userInfo && <span className="text-gray-600" style={{ display: 'none' }}>Bienvenido, {String(userInfo.userType || 'Usuario')}</span>}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Proveedores</h1>
                            <p className="mt-2 text-gray-600">Gestiona los proveedores de tu ferretería</p>
                        </div>
                        <button
                            onClick={handleAddProvider}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Agregar Proveedor
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Buscar proveedores por nombre o teléfono..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <p className="text-gray-600 text-center">{error}</p>
                        <button
                            onClick={fetchProviders}
                            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : filteredProviders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Plus className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm ? 'No se encontraron proveedores' : 'No hay proveedores'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {searchTerm
                                ? 'Intenta con otros términos de búsqueda'
                                : 'Comienza agregando tu primer proveedor'
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddProvider}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                            >
                                <Plus className="w-5 h-5" />
                                Agregar Primer Proveedor
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProviders.map((provider) => (
                            <ProviderCard
                                key={provider._id}
                                provider={provider}
                                onEdit={handleEditProvider}
                                onDelete={handleDeleteProvider}
                            />
                        ))}
                    </div>
                )}
            </main>

            <ProviderModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProvider}
                provider={editingProvider}
            />
        </div>
    );
};

export default Providers;