
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-slate text-gray-300">
            <div className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500"></div>
            <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 font-heading">Mamacitos</h3>
                        <p className="text-sm">Conexiones auténticas en un espacio seguro y discreto.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Compañía</h4>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-brand-pink">Sobre nosotros</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-brand-pink">Prensa</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-brand-pink">Carreras</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul>
                            <li className="mb-2"><a href="#" className="hover:text-brand-pink">Términos de Servicio</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-brand-pink">Política de Privacidad</a></li>
                            <li className="mb-2"><a href="#" className="hover:text-brand-pink">Seguridad</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            {/* Placeholder icons */}
                            <a href="#" className="hover:text-brand-pink">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M... some path ..."/></svg>
                            </a>
                             <a href="#" className="hover:text-brand-pink">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M... some path ..."/></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Mamacitos. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
