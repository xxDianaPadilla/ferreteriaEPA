import { useState, useEffect } from 'react'
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import Brands from './pages/Brands';
import Providers from './pages/Providers';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [isAuthenticated, setIdAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      console.log('Verificando estado de autenticación');
      const response = await fetch('https://ferreteriaepa.onrender.com/api/verify-auth', {
        method: 'GET',
        credentials: 'include',
      });

      console.log('Respuesta del servidor: ', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Usuario autenticado: ', data);
        setIdAuthenticated(true);
        setUserInfo(data.user);
        setCurrentView('products');
      } else {
        console.log('Usuario no autenticado o token inválido');
        setIdAuthenticated(false);
        setUserInfo(null);
        setCurrentView('login');
      }
    } catch (error) {
      console.error('Error verificando autenticación: ', error);
      setIdAuthenticated(false);
      setUserInfo(null);
      setCurrentView('login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = async () => {
    await checkAuthStatus();
  };

  const handleLogOut = async () => {
    try {
      await fetch('https://ferreteriaepa.onrender.com/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }

    setIdAuthenticated(false);
    setUserInfo(null);
    setCurrentView('login');
  };

  const handleNavigateToProducts = () => {
    setCurrentView('products');
  }

  const handleNavigateToBrands = () => {
    setCurrentView('brands');
  }

  const handleNavigateToProviders = () => {
    setCurrentView('providers');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  switch (currentView) {
    case 'register':
      return (
        <Register
          onSwitchToLogin={handleSwitchToLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
      );
    case 'login':
      return (
        <Login
          onSwitchToRegister={handleSwitchToRegister}
          onLoginSuccess={handleLoginSuccess}
        />
      );
    case 'products':
      return (
        <Products
          onLogOut={handleLogOut}
          onNavigateToBrands={handleNavigateToBrands}
          onNavigateToProviders={handleNavigateToProviders}
          userInfo={userInfo} />
      );
    case 'brands':
      return (
        <Brands
          onLogOut={handleLogOut}
          onNavigateToProducts={handleNavigateToProducts}
          onNavigateToProviders={handleNavigateToProviders} 
          userInfo={userInfo}/>
      );
    case 'providers':
      return (
        <Providers
          onLogOut={handleLogOut}
          onNavigateToProducts={handleNavigateToProducts}
          onNavigateToBrands={handleNavigateToBrands}
          userInfo={userInfo} />
      )
    default:
      return (
        <Register
          onSwitchToLogin={handleSwitchToLogin}
          onRegisterSuccess={handleRegisterSuccess}
        />
      );
  }
}

export default App;