import React, { useState } from 'react';
import { Page } from '../../types';
import DirectMessagingModal from '../common/DirectMessagingModal';
import SiteIcon from '../common/SiteIcon';
import { useFavorites } from '../../src/utils/favorites';
import { useDiscretionMode } from '../../src/utils/discretionMode';
import { Heart, Eye, EyeOff } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  current_page: Page;
  onRegisterClick: () => void;
}

const NavLink: React.FC<{ 
  page: Page; 
  label: string; 
  onNavigate: (page: Page) => void; 
  currentPage: Page;
  badge?: string;
}> = ({ page, label, onNavigate, currentPage, badge }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onNavigate(page)}
      className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-200 flex items-center gap-1.5 ${
        isActive 
          ? 'text-amber-400 bg-neutral-900/80 border border-neutral-800' 
          : 'text-neutral-300 hover:text-white hover:bg-neutral-900/40'
      }`}
    >
      <span>{label}</span>
      {badge && (
        <span className="text-[9px] bg-rose-600 text-white font-extrabold px-1.5 py-0.2 rounded uppercase">
          {badge}
        </span>
      )}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ onNavigate, current_page, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDirectMessagingOpen, setIsDirectMessagingOpen] = useState(false);
  const { count: favoritesCount } = useFavorites();
  const { isDiscretionMode, toggleDiscretionMode } = useDiscretionMode();

  const navLinks = [
    { page: 'home' as Page, label: 'Inicio' },
    { page: 'explore' as Page, label: 'Explorar' },
    { page: 'blog' as Page, label: 'Blog & Insights', badge: 'Nuevo' },
    { page: 'comparte_contenido' as Page, label: 'Comparte Contenido' },
    { page: 'discreet_payments' as Page, label: 'Pagos Discretos' },
    { page: 'verification' as Page, label: 'Verificación & 2FA' },
    { page: 'premium' as Page, label: '★ Premium VIP' },
    { page: 'profile' as Page, label: 'Mi Perfil', badge: favoritesCount > 0 ? `${favoritesCount} ❤️` : undefined },
  ];

  return (
    <header className="bg-neutral-950/90 backdrop-blur-md sticky top-0 z-40 border-b border-neutral-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Site Icon */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <button 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2 hover:opacity-95 transition-opacity focus:outline-none"
              aria-label="Ir al inicio de Mamacitos"
            >
              <SiteIcon size="sm" alt="Mamacitos Glyph" className="hidden sm:inline-flex" />
              <img 
                src="/assets/aistudio/loco-sitio-mamacitos_aa765503.png" 
                alt="Mamacitos - El lugar para assy4u" 
                className="h-[52px] sm:h-[62px] w-auto object-contain"
                style={{ height: '61.9978px' }}
              />
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:block">
            <div className="ml-4 flex items-center space-x-1 xl:space-x-2">
              {navLinks.map(link => (
                <NavLink key={link.page} {...link} onNavigate={onNavigate} currentPage={current_page} />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2.5">
            {favoritesCount > 0 && (
              <button
                onClick={() => onNavigate('profile')}
                className="bg-neutral-900 hover:bg-neutral-800 text-rose-300 border border-rose-500/40 text-xs font-bold py-2 px-3 rounded-full transition-all flex items-center gap-1.5 shadow"
                title="Ver perfiles guardados en Mi Perfil"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
                <span>{favoritesCount}</span>
              </button>
            )}

            {/* Instant Discretion Mode Quick Switch */}
            <button
              onClick={toggleDiscretionMode}
              className={`text-xs font-bold py-2 px-3 rounded-full transition-all flex items-center gap-1.5 border shadow ${
                isDiscretionMode
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/70 hover:bg-emerald-900/60 ring-1 ring-emerald-500/40'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-700 hover:text-white'
              }`}
              title={isDiscretionMode ? 'Modo Discreción Activo (Haz clic para desactivar)' : 'Activar Modo Discreción (Capa de Privacidad Instantánea)'}
            >
              {isDiscretionMode ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xl:inline">Discreción:</span>
                  <span className="text-emerald-400">ON</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="hidden xl:inline">Discreción</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsDirectMessagingOpen(true)}
              className="bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-400/30 text-xs font-bold py-2 px-3.5 rounded-full transition-all flex items-center gap-1.5 shadow"
            >
              <span>💬 Mensajes E2EE</span>
            </button>
            
            <button 
              onClick={onRegisterClick} 
              className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold py-2 px-5 rounded-full transition-transform transform hover:scale-105 shadow-md"
            >
              Regístrate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-neutral-900 inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú</span>
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden border-t border-neutral-800 bg-neutral-950`} id="mobile-menu">
        <div className="px-3 pt-3 pb-4 space-y-1 text-center">
          {navLinks.map(link => (
            <div key={link.page} onClick={() => setIsMenuOpen(false)}>
              <NavLink {...link} onNavigate={onNavigate} currentPage={current_page} />
            </div>
          ))}

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                toggleDiscretionMode();
              }}
              className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-between border transition-all ${
                isDiscretionMode
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {isDiscretionMode ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-neutral-400" />}
                <span>Modo Discreción (Privacidad)</span>
              </div>
              <span className="font-mono text-[10px]">{isDiscretionMode ? 'ACTIVO' : 'APAGADO'}</span>
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsDirectMessagingOpen(true);
              }}
              className="w-full bg-neutral-900 text-amber-400 border border-neutral-800 text-xs font-bold py-2.5 rounded-lg"
            >
              💬 Mensajes Directos por Voz
            </button>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onRegisterClick();
              }} 
              className="w-full bg-rose-600 text-white font-bold py-2.5 rounded-lg text-xs"
            >
              Regístrate / Iniciar Sesión
            </button>
          </div>
        </div>
      </div>

      <DirectMessagingModal
        isOpen={isDirectMessagingOpen}
        onClose={() => setIsDirectMessagingOpen(false)}
        recipientName="Atención a Clientes / VIP"
        recipientCode="MMC-SUPPORT"
      />
    </header>
  );
};

export default Header;