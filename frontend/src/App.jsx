import { useState } from 'react'
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';

function App() {
  const [currentView, setCurrentView] = useState('register');

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('login');
  };

  const handleLoginSuccess = () => {
    setCurrentView('products');
  };

  const handleLogOut = () => {
    setCurrentView('login');
  };

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
        <Products onLogOut={handleLogOut} />
      );
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