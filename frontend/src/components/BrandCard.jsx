import { Edit, Trash2, Calendar } from 'lucide-react';

const BrandCard = ({ brand, onEdit, onDelete }) => {

    const { _id, name, year, slogan, image } = brand;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-video bg-gray-100 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-4xl font-bold">{name?.charAt(0)}</span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
                    {year && (
                        <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>Fundada en {year}</span>
                        </div>
                    )}
                    {slogan && (
                        <p className="text-gray-600 italic text-sm">"{slogan}"</p>
                    )}
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                        onClick={() => onEdit(brand)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <Edit className="w-4 h-4" />
                        Editar
                    </button>

                    <button
                        onClick={() => onDelete(_id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrandCard;