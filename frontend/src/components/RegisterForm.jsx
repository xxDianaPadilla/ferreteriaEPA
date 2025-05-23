import { useState } from "react";

const RegisterForm = ({onSwitchToLogin, onRegisterSuccess}) => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        birthday: "",
        email: "",
        password: '',
        telephone: '',
        dui: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if(errors[name]){
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if(!formData.name.trim()) newErrors.name = 'El nombre es requerido';
        if(!formData.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
        if(!formData.birthday) newErrors.birthday = 'La fecha de nacimiento es requerida';
        if(!formData.email.trim()) newErrors.email = 'El email es requerido';
        if(!formData.password.trim()) newErrors.password = 'La contraseña es requerida';
        if(!formData.telephone.trim()) newErrors.telephone = 'El teléfono es requerido';
        if(!formData.dui.trim()) newErrors.dui = 'El DUI es requerido';

        if(formData && !/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email = 'El email no es válido';
        }

        if(formData.password && formData.password.length < 6){
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/registerClients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...formData,
                    isVerified: false
                }),
            });

            const data = await response.json();

            if(response.ok){
                alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
                onRegisterSuccess();
            }else{
                alert(data.message || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error: ', error);
            alert('Error de conexión con el servidor');
        }finally{
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFD700' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="text-center py-8 px-8" style={{ backgroundColor: '#0066CC' }}>
          <h2 className="text-4xl font-bold text-white mb-2">Registro</h2>
          <p className="text-blue-100">Crea tu cuenta para comenzar</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 ${
                  errors.name 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Ingresa tu nombre"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Apellido *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 ${
                  errors.lastName 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Ingresa tu apellido"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1 font-medium">{errors.lastName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha de Nacimiento *
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 ${
                  errors.birthday 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
              />
              {errors.birthday && <p className="text-red-500 text-sm mt-1 font-medium">{errors.birthday}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 ${
                  errors.telephone 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="2234-5678"
              />
              {errors.telephone && <p className="text-red-500 text-sm mt-1 font-medium">{errors.telephone}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="ejemplo@correo.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 ${
                  errors.password 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="Mínimo 6 caracteres"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                DUI *
              </label>
              <input
                type="text"
                name="dui"
                value={formData.dui}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-3 transition-all duration-200 ${
                  errors.dui 
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
                placeholder="12345678-9"
              />
              {errors.dui && <p className="text-red-500 text-sm mt-1 font-medium">{errors.dui}</p>}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 px-6 text-white font-bold text-lg rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl"
              style={{ 
                backgroundColor: loading ? '#94a3b8' : '#0066CC',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(0, 102, 204, 0.3)'
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Registrando...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 font-medium">o</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-3">¿Ya tienes una cuenta?</p>
            <button
              onClick={onSwitchToLogin}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
              style={{ borderColor: '#0066CC', color: '#0066CC' }}
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
    );
};

export default RegisterForm;