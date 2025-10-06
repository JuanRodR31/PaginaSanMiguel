import { Menu, X, Trophy } from 'lucide-react';
import { useState } from 'react';

import Logo from './assets/logosanmiguel.png';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Sobre Nosotros' },
    { id: 'players', label: 'Jugadores' },
    { id: 'events', label: 'Eventos' },
    { id: 'videos', label: 'Videos' },
    { id: 'donate', label: 'Donaciones' },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigate('home')}>
            <img 
            src={Logo} 
            alt="Logo Fundación San Miguel" 
            className="h-10 w-auto" // Ajusta la altura (h-10) y el ancho (w-auto) según necesites
            />
            <span className="ml-2 text-white text-xl font-bold">Fundación San Miguel</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`text-white hover:text-orange-400 transition-colors px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === item.id ? 'bg-slate-700 text-orange-400' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
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
                className={`block w-full text-left text-white hover:text-orange-400 hover:bg-slate-700 transition-colors px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id ? 'bg-slate-700 text-orange-400' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
