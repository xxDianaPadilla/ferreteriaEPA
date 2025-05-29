import { useState, useEffect } from "react";
import { Plus, Search, AlertCircle } from 'lucide-react';
import Header from "../components/Header";
import BrandCard from '../components/BrandCard';
import BrandModal from '../components/BrandModal';

const Brands = ({ onLogOut, onNavigateToProducts, onNavigateToProviders, userInfo }) => {
    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'https://ferreteriaepa.onrender.com/api/brands';

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        const filtered = brands.filter(brand =>
            brand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.slogan?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBrands(filtered);
    }, [brands, searchTerm]);

    const fetchBrands = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(API_BASE_URL);
            if (!response.ok) {
                throw new Error('Error al cargar las marcas');
            }
            const data = await response.json();
            setBrands(data);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching brands: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveBrand = async (formData, brandId = null) => {
        try {
            const url = brandId ? `${API_BASE_URL}/${brandId}` : API_BASE_URL;
            const method = brandId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error al guardar la marca');
            }

            await fetchBrands();
            setIsModalOpen(false);
            setEditingBrand(null);
        } catch (error) {
            console.error('Error saving brand: ', error);
            alert('Error al guardar la marca. Por favor, intenta de nuevo.');
        }
    };

    const handleEditBrand = (brand) => {
        setEditingBrand(brand);
        setIsModalOpen(true);
    };

    const handleDeleteBrand = async (brandId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta marca?')) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${brandId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar la marca');
            }

            await fetchBrands();
        } catch (error) {
            console.error('Error deleting brand: ', error);
            alert('Error al eliminar la marca. Por favor, intenta de nuevo.');
        }
    };

    const handleAddBrand = () => {
        setEditingBrand(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBrand(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                onLogOut={onLogOut}
                onNavigateToProducts={onNavigateToProducts}
                onNavigateToBrands={() => { }}
                onNavigateToProviders={onNavigateToProviders}
                currentPage="brands"
            />
            {userInfo && <span className="text-gray-600" style={{ display: 'none' }}>Bienvenido, {String(userInfo.userType || 'Usuario')}</span>}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Gestión de Marcas</h2>
                            <p className="text-gray-600 mt-1">
                                Administra las marcas de productos de la ferretería
                            </p>
                        </div>

                        <button
                            onClick={handleAddBrand}
                            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 shadow-sm"
                        >
                            <Plus className="w-5 h-5" />
                            Agregar Marca
                        </button>
                    </div>

                    <div className="mt-6 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar marcas por nombre o eslogan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Cargando marcas...</span>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 text-lg">{error}</p>
                            <button
                                onClick={fetchBrands}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                ) : filteredBrands.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🏷️</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            {searchTerm ? 'No se encontraron marcas' : 'No hay marcas registradas'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm
                                ? `No hay marcas que coincidan con "${searchTerm}"`
                                : 'Comienza agregando tu primera marca'
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddBrand}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Agregar Primera Marca
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                {searchTerm
                                    ? `${filteredBrands.length} marca${filteredBrands.length !== 1 ? 's' : ''} encontrada${filteredBrands.length !== 1 ? 's' : ''}`
                                    : `${brands.length} marca${brands.length !== 1 ? 's' : ''} registrada${brands.length !== 1 ? 's' : ''}`
                                }
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredBrands.map((brand) => (
                                <BrandCard
                                    key={brand._id}
                                    brand={brand}
                                    onEdit={handleEditBrand}
                                    onDelete={handleDeleteBrand}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <BrandModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSave={handleSaveBrand}
                brand={editingBrand}
                isEditing={!!editingBrand}
            />
        </div>
    );
};

export default Brands;