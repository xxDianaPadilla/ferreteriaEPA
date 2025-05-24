import { useState } from "react";

const LoginForm = ({onSwitchToRegister, onLoginSuccess}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        if(!formData.email.trim()) newErrors.email = 'El email es requerido';
        if(!formData.password.trim()) newErrors.password = 'La contraseña es requerida';

        if(formData.email && !/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email = 'El email no es válido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateForm()) return;

        setLoading(true);

        try {
          const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(formData),
          });

          const data = await response.json();

          if(response.ok){
            alert('Login exitoso');
            onLoginSuccess();
          }else{
            alert(data.message || 'Credenciales incorrectas');
          }
        } catch (error) {
            console.error('Error: ', error);
            alert('Error de conexión con el servidor');
            setLoading(false);
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center p-4" style={{backgroundColor: '#FFD700'}}>
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold" style={{color: '#0066CC'}}>Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Accede a tu cuenta</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tu contraseña"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
            style={{backgroundColor: '#0066CC'}}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes cuenta?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-blue-600 hover:text-blue-800 font-medium"
              style={{color: '#0066CC'}}
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
    );
};

export default LoginForm;