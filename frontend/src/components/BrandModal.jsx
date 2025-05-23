import { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from 'lucide-react';

const BrandModal = ({ isOpen, onClose, onSave, brand, isEditing }) => {
    const [formData, setFormData] = useState({
        name: '',
        year: '',
        slogan: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isEditing && brand) {
            setFormData({
                name: brand.name || '',
                year: brand.year || '',
                slogan: brand.slogan || ''
            });
            setImagePreview(brand.image || '');
            setImageFile(null);
        } else {
            setFormData({
                name: '',
                year: '',
                slogan: ''
            });
            setImagePreview('');
            setImageFile(null);
        }
    }, [isEditing, brand, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('year', formData.year);
            formDataToSend.append('slogan', formData.slogan);

            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            await onSave(formDataToSend, isEditing ? brand._id : null);
            onClose();
        } catch (error) {
            console.error('Error saving brand: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEditing ? 'Editar Marca' : 'Agregar Nueva Marca'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de la marca *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej: Makita"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Año de fundación
                            </label>
                            <input
                                type="number"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                min="1800"
                                max={new Date().getFullYear()}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej: 1915"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Eslogan
                            </label>
                            <textarea
                                name="slogan"
                                value={formData.slogan}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Ej: Herramientas profesionales para profesionales"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Imagen
                            </label>
                            <div className="space-y-3">
                                {imagePreview && (
                                    <div className="relative">
                                        <img
                                            src={imagePreview}
                                            alt="Vista previa"
                                            className="w-full h-32 object-cover rounded-lg border"
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click para subir</span> o arrastra una imagen
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG o JPEG</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !formData.name}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Guardar')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BrandModal;