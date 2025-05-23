import {Edit, Trash2, User} from 'lucide-react';

const ProviderCard = ({provider, onEdit, onDelete}) => {
    return(
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
            <div className="relative">
                {provider.image ? (
                    <img 
                        src={provider.image} 
                        alt={provider.name}
                        className="w-full h-48 object-cover"
                    />
                ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                    </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                    <button
                        onClick={() => onEdit(provider)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition-colors duration-200"
                        title="Editar proveedor"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(provider._id)}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors duration-200"
                        title="Eliminar proveedor"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{provider.name}</h3>
                <div className="space-y-1">
                    <p className="text-gray-600">
                        <span className="font-medium">Teléfono:</span> {provider.telephone}
                    </p>
                    <p className="text-xs text-gray-500">
                        Creado: {new Date(provider.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProviderCard;