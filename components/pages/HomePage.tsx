
import React from 'react';
import { Page } from '../../types';
import AIFeatureShowcase from '../ai/AIFeatureShowcase';
import SearchGroundedSafetyNews from '../common/SearchGroundedSafetyNews';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onRegisterClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onRegisterClick }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden py-12">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://picsum.photos/1600/900?grayscale&blur=2')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-deep-purple/90 via-brand-purple-dark/95 to-brand-purple-dark"></div>
        
        <div className="relative z-10 animate-fade-in-up max-w-4xl mx-auto">
          <span className="bg-brand-pink/20 border border-brand-pink text-brand-pink text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest inline-block mb-4">
            Plataforma Segura & Discreta +18
          </span>

          <h1 className="my-2 flex justify-center items-center">
            <img
              src="/assets/aistudio/bienvenidos-mamacitos_95166a46.png"
              alt="Mamacitos"
              className="h-20 sm:h-28 md:h-36 w-auto max-w-full object-contain mx-auto filter drop-shadow-md"
            />
            <span className="sr-only">Mamacitos</span>
          </h1>

          <p className="mt-4 text-xl md:text-3xl text-brand-lime font-bold max-w-3xl mx-auto">
            El sitio para assy4U
          </p>

          <p className="mt-3 text-sm md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Disfruta de conexiones discretas, con chica sis, tv, sissy, trans, jochis chiken y fems, de manera discreta, segura con perfiles verificados.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onRegisterClick}
              className="bg-brand-pink hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl shadow-brand-pink/30"
            >
              Regístrate Gratis o Hazte Premium
            </button>
            <button
              onClick={() => onNavigate('premium')}
              className="bg-brand-lime text-brand-purple-dark hover:bg-opacity-90 font-extrabold py-4 px-8 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl"
            >
              ★ Ver Ventajas Premium
            </button>
          </div>
        </div>
      </div>

      {/* Premium Advantages Highlights Section */}
      <div className="py-16 bg-brand-deep-purple/80 border-y border-brand-purple-light/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-white">
              ¿Por qué Registrarse en Mamacitos?
            </h2>
            <p className="mt-2 text-base text-brand-purple-light">
              Poder absoluto sobre tu privacidad, contenido y visualización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-brand-slate p-6 rounded-2xl border border-gray-700 hover:border-brand-pink transition-all">
              <div className="w-12 h-12 bg-brand-pink/20 text-brand-pink rounded-xl flex items-center justify-center mb-4 font-bold text-2xl">
                🔓
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Fotos Sin Censura / Blur</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Desbloquea las imágenes completas subidas por las prestadoras registradas sin filtros de blur.
              </p>
            </div>

            <div className="bg-brand-slate p-6 rounded-2xl border border-gray-700 hover:border-brand-pink transition-all">
              <div className="w-12 h-12 bg-brand-pink/20 text-brand-pink rounded-xl flex items-center justify-center mb-4 font-bold text-2xl">
                💬
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Mensajería Directa (DMs)</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Envía mensajes directos privados para coordinar encuentros y servicios sin intermediarios de terceros.
              </p>
            </div>

            <div className="bg-brand-slate p-6 rounded-2xl border border-gray-700 hover:border-brand-pink transition-all">
              <div className="w-12 h-12 bg-brand-pink/20 text-brand-pink rounded-xl flex items-center justify-center mb-4 font-bold text-2xl">
                🕵️
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Modo Incógnito & Online</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Consulta quién está en línea y desactiva tu propio estado para navegar de forma 100% encubierta.
              </p>
            </div>

            <div className="bg-brand-slate p-6 rounded-2xl border border-gray-700 hover:border-brand-pink transition-all">
              <div className="w-12 h-12 bg-brand-pink/20 text-brand-pink rounded-xl flex items-center justify-center mb-4 font-bold text-2xl">
                🌐
              </div>
              <h3 className="text-xl font-heading text-white mb-2">Landing Page Personal</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Las prestadoras registradas pueden compartir su enlace personal fuera del sitio con restricciones de contenido.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="py-16 bg-brand-slate">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div 
              onClick={() => onNavigate('comparte_contenido')}
              className="bg-brand-deep-purple/60 p-8 rounded-2xl border border-gray-700 hover:border-brand-pink cursor-pointer transition-all hover:-translate-y-2"
            >
              <span className="text-xs font-bold text-brand-pink uppercase tracking-wider">Sustituto de Armario Virtual</span>
              <h3 className="text-2xl font-heading text-white mt-1 mb-2">Comparte Contenido</h3>
              <p className="text-xs text-gray-300 mb-4">
                Pone tus precios, tiempo de desbloqueo y restricciones de descarga para vender contenido digital sin compartir teléfonos.
              </p>
              <span className="text-xs text-brand-lime font-bold">Ir a Comparte Contenido ➔</span>
            </div>

            <div 
              onClick={() => onNavigate('discreet_payments')}
              className="bg-brand-deep-purple/60 p-8 rounded-2xl border border-gray-700 hover:border-brand-pink cursor-pointer transition-all hover:-translate-y-2"
            >
              <span className="text-xs font-bold text-brand-lime uppercase tracking-wider">Investigación & Bóveda</span>
              <h3 className="text-2xl font-heading text-white mt-1 mb-2">Pagos Discretos por ID</h3>
              <p className="text-xs text-gray-300 mb-4">
                Transfiere mediante tu ID de Usuario sin comprometer nombres ni números bancarios con calculadora de comisión.
              </p>
              <span className="text-xs text-brand-pink font-bold">Simular Pago Anónimo ➔</span>
            </div>

            <div 
              onClick={() => onNavigate('verification')}
              className="bg-brand-deep-purple/60 p-8 rounded-2xl border border-gray-700 hover:border-brand-pink cursor-pointer transition-all hover:-translate-y-2"
            >
              <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Seguridad Obligatoria</span>
              <h3 className="text-2xl font-heading text-white mt-1 mb-2">Verificación & 2FA</h3>
              <p className="text-xs text-gray-300 mb-4">
                Validación INE / Pasaporte, botón de pánico 911 y reseñas con reglas de visibilidad de alta calificación.
              </p>
              <span className="text-xs text-green-400 font-bold">Verificar Mi Perfil ➔</span>
            </div>

          </div>
        </div>
      </div>
      
      {/* Real-time Search Grounded Safety & Local Events Dashboard */}
      <div className="py-12 bg-gray-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SearchGroundedSafetyNews />
        </div>
      </div>

      {/* AI Features Showcase */}
      <AIFeatureShowcase />
    </>
  );
};

export default HomePage;