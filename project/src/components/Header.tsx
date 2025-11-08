import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Search, User, LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isAdmin = user?.email === 'heyhouseimoveis@gmail.com';

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <Logo />
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HeyHouse
              </span>
              <span className="text-xs text-gray-500 -mt-1">Transformando sonhos em lares</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <HomeIcon size={20} />
              <span>Início</span>
            </Link>
            <Link 
              to="/imoveis" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Search size={20} />
              <span>Imóveis</span>
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 transition-colors font-semibold"
              >
                <Settings size={20} />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/perfil"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} />
                  )}
                  <span>{user.name}</span>
                  {isAdmin && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Admin
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Entrar
                </Link>
                <Link 
                  to="/cadastro"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon size={20} />
                <span>Início</span>
              </Link>
              <Link 
                to="/imoveis" 
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search size={20} />
                <span>Imóveis</span>
              </Link>
              
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings size={20} />
                  <span>Painel Admin</span>
                </Link>
              )}
              
              {user ? (
                <>
                  <Link 
                    to="/perfil"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>Meu Perfil</span>
                    {isAdmin && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                        Admin
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors text-left"
                  >
                    <LogOut size={20} />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link 
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link 
                    to="/cadastro"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
