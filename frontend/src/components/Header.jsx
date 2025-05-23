import { LogOut, Package, Tag, Truck } from 'lucide-react';

const Header = ({ onLogOut, onNavigateToProducts, onNavigateToBrands, onNavigateToProviders, currentPage }) => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold text-blue-900">Ferretería EPA</h1>

                        <nav className="flex items-center gap-4">
                            <button
                                onClick={onNavigateToProducts}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === 'products'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Package className="w-5 h-5" />
                                Productos
                            </button>

                            <button
                                onClick={onNavigateToBrands}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === 'brands'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Tag className="w-5 h-5" />
                                Marcas
                            </button>

                            <button
                                onClick={onNavigateToProviders}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${currentPage === 'providers'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Truck className="w-5 h-5" />
                                Proveedores
                            </button>
                        </nav>
                    </div>

                    <button
                        onClick={onLogOut}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                        <LogOut className="w-5 h-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;