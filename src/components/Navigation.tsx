import { Menu, X, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Logo from './assets/logosanmiguel.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, username, logout } = useAuth();

   const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Nosotros' },
    { id: 'players', label: 'Jugadores' },
    { id: 'events', label: 'Eventos' },
    { id: 'videos', label: 'Galería' },
    { id: 'donate', label: 'Donaciones' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigate('home')}>
            <img 
              src={Logo} 
              alt="Logo Fundación San Miguel" 
              className="h-12 w-auto"
            />
            <span className="ml-2 text-white text-xl font-bold">Fundación San Miguel</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  currentPage === item.id 
                    ? 'bg-white text-[#192335]' 
                    : 'text-white hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-slate-600">
                <span className="text-white text-sm">{username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-slate-700 transition-all flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavigate('login')}
                className="px-6 py-2 rounded-full text-sm font-medium text-white hover:bg-slate-700 transition-all flex items-center space-x-1 ml-4"
              >
                <LogIn className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-orange-400 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'bg-white text-[#192335]' 
                    : 'text-white hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <div className="px-3 py-2 text-white text-sm border-t border-slate-600 mt-2 pt-2">
                  {username}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate('login')}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 transition-colors flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}