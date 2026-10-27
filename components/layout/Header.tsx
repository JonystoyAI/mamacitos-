
import React, { useState } from 'react';
import Logo from '../Logo';
import { Page } from '../../types';
import DirectMessagingModal from '../common/DirectMessagingModal';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    current_page: Page;
    onRegisterClick: () => void;
}

const NavLink: React.FC<{ page: Page; label: string; onNavigate: (page: Page) => void; currentPage: Page;}> = ({ page, label, onNavigate, currentPage }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => onNavigate(page)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-300 ${isActive ? 'text-brand-pink' : 'text-gray-300 hover:text-white'}`}
        >
            {label}
        </button>
    );
}

const Header: React.FC<HeaderProps> = ({ onNavigate, current_page, onRegisterClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDirectMessagingOpen, setIsDirectMessagingOpen] = useState(false);
    
    const navLinks = [
        { page: 'home' as Page, label: 'Inicio' },
        { page: 'explore' as Page, label: 'Explorar' },
        { page: 'comparte_contenido' as Page, label: 'Comparte Contenido' },
        { page: 'discreet_payments' as Page, label: 'Pagos Discretos' },
        { page: 'verification' as Page, label: 'Verificación & 2FA' },
        { page: 'premium' as Page, label: '★ Premium VIP' },
    ];
    
    return (
        <header className="bg-brand-slate/30 backdrop-blur-md sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <button 
                            onClick={() => onNavigate('home')} 
                            className="flex items-center hover:opacity-90 transition-opacity focus:outline-none"
                            aria-label="Ir al inicio de Mamacitos"
                        >
                            <img 
                                src="/assets/aistudio/loco-sitio-mamacitos_aa765503.png" 
                                alt="Mamacitos - El lugar para assy4u" 
                                className="h-[56px] sm:h-[62px] w-auto object-contain"
                                style={{ height: '61.9978px' }}
                            />
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                           {navLinks.map(link => (
                               <NavLink key={link.page} {...link} onNavigate={onNavigate} currentPage={current_page} />
                           ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-3">
                        <button
                            onClick={() => setIsDirectMessagingOpen(true)}
                            className="bg-brand-slate hover:bg-gray-800 text-brand-lime border border-brand-lime/40 text-xs font-bold py-2 px-4 rounded-full transition-all flex items-center gap-1.5 shadow"
                        >
                            <span>💬 Mensajes (Voz)</span>
                        </button>
                        
                        <button onClick={onRegisterClick} className="bg-brand-pink hover:bg-opacity-80 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-transform transform hover:scale-105 shadow-md">
                            Regístrate
                        </button>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                    {navLinks.map(link => (
                       <NavLink key={link.page} {...link} onNavigate={onNavigate} currentPage={current_page} />
                   ))}
                    <button onClick={onRegisterClick} className="w-full mt-4 bg-brand-pink hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105">
                        Regístrate
                    </button>
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