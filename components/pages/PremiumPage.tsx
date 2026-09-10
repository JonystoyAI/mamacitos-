import React from 'react';
import { Page } from '../../types';

interface PremiumPageProps {
  onNavigate: (page: Page) => void;
  onRegisterClick: () => void;
}

const PremiumPage: React.FC<PremiumPageProps> = ({ onNavigate, onRegisterClick }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Header */}
      <div className="text-center mb-16">
        <span className="bg-brand-pink text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
          Mamacitos VIP & Premium Experience
        </span>
        <h1 className="text-4xl sm:text-6xl font-heading text-white mt-4 drop-shadow-md">
          ¡BIENVENIDO MAMACITO!
        </h1>
        <p className="text-xl text-brand-lime font-bold mt-2">
          Lleva tu Experiencia al Siguiente Nivel al Registrarte y Activar Tu Membresía VIP
        </p>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Desbloquea el poder total de Mamacitos con funciones exclusivas para usuarios y prestadoras de servicios. Controla tu privacidad, navega de forma incógnita y posiciona tu marca personal.
        </p>
      </div>

      {/* Comparison Grid: Users vs Service Providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* PREMIUM PARA USUARIOS */}
        <div className="bg-brand-slate p-8 rounded-3xl border-2 border-brand-pink/60 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
            Para Usuarios
          </div>

          <div>
            <h2 className="text-3xl font-heading text-white mb-2">Ventajas Premium para Usuarios</h2>
            <p className="text-xs text-brand-purple-light mb-6">Máximo acceso, fotos sin censura y privacidad incógnita.</p>

            <ul className="space-y-4 text-sm text-gray-200 mb-8">
              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-pink/20 text-brand-pink rounded-lg mt-0.5 font-bold">✓</span>
                <div>
                  <strong className="text-white block">Fotos Sin Censura & Desbloqueo de Galerías:</strong>
                  <span>Visualiza todas las fotografías originales subidas por prestadoras sin ningun filtro o blur.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-pink/20 text-brand-pink rounded-lg mt-0.5 font-bold">✓</span>
                <div>
                  <strong className="text-white block">Mensajería Directa Ilimitada (DMs):</strong>
                  <span>Inicia chats privados e instantáneos directamente con tus perfiles favoritos sin restricciones.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-pink/20 text-brand-pink rounded-lg mt-0.5 font-bold">✓</span>
                <div>
                  <strong className="text-white block">Ver Quién Está En Línea & Modo Incógnito:</strong>
                  <span>Detecta usuarios activos en tiempo real y oculta tu propio estado online para navegar sin dejar rastro.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-pink/20 text-brand-pink rounded-lg mt-0.5 font-bold">✓</span>
                <div>
                  <strong className="text-white block">Descuentos en Bóveda de Contenido:</strong>
                  <span>Acceso preferencial para desbloquear enlaces de contenido en "Comparte Contenido".</span>
                </div>
              </li>
            </ul>
          </div>

          <button
            onClick={onRegisterClick}
            className="w-full bg-brand-pink hover:bg-opacity-90 text-white font-bold py-4 rounded-2xl text-base shadow-xl transition-all transform hover:scale-[1.02]"
          >
            Registrarme como Usuario Premium ($199 MXN / Mes)
          </button>
        </div>

        {/* PREMIUM PARA PRESTADORAS DE SERVICIOS */}
        <div className="bg-brand-slate p-8 rounded-3xl border-2 border-brand-lime/60 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-brand-lime text-brand-purple-dark text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
            Para Prestadoras de Servicios
          </div>

          <div>
            <h2 className="text-3xl font-heading text-white mb-2">Ventajas Premium para Prestadoras</h2>
            <p className="text-xs text-brand-lime mb-6">Landing page personal fuera del sitio y posicionamiento VIP.</p>

            <ul className="space-y-4 text-sm text-gray-200 mb-8">
              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-lime/20 text-brand-lime rounded-lg mt-0.5 font-bold">★</span>
                <div>
                  <strong className="text-white block">Landing Page Personal Externa (URL Única & Slug):</strong>
                  <span>Tu perfil funciona como una web personal (ej. mamacitos.com/p/tu-nombre) con muro de contraseña (PIN), blur de fotos y marca de agua anti-captura.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-lime/20 text-brand-lime rounded-lg mt-0.5 font-bold">★</span>
                <div>
                  <strong className="text-white block">Posicionamiento VIP (Primeros Puestos):</strong>
                  <span>Aparece fijada en las primeras posiciones de las búsquedas en todos los estados y municipios de México.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-lime/20 text-brand-lime rounded-lg mt-0.5 font-bold">★</span>
                <div>
                  <strong className="text-white block">Publicación en "Comparte Contenido":</strong>
                  <span>Vende contenido digital, sets de fotos y enlaces con cobro por ID sin dar tus números personales.</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="p-1 bg-brand-lime/20 text-brand-lime rounded-lg mt-0.5 font-bold">★</span>
                <div>
                  <strong className="text-white block">Insignia Oficial Verificada INE / Pasaporte:</strong>
                  <span>Proyecta total confianza con la insignia oficial de seguridad.</span>
                </div>
              </li>
            </ul>
          </div>

          <button
            onClick={onRegisterClick}
            className="w-full bg-brand-lime hover:bg-opacity-90 text-brand-purple-dark font-bold py-4 rounded-2xl text-base shadow-xl transition-all transform hover:scale-[1.02]"
          >
            Registrarme como Prestadora VIP ($299 MXN / Mes)
          </button>
        </div>

      </div>

      {/* Feature Action Bar */}
      <div className="bg-brand-deep-purple/80 p-8 rounded-2xl border border-brand-purple-light/20 text-center">
        <h3 className="text-2xl font-heading text-white mb-2">¿Quieres probar antes de suscribirte?</h3>
        <p className="text-xs text-gray-300 max-w-xl mx-auto mb-6">
          Puedes crear una cuenta básica gratuita para explorar perfiles en tu municipio, configurar tus contactos de pánico y probar la calculadora de pagos discretos.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onNavigate('explore')}
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full text-sm border border-gray-600"
          >
            Explorar Perfiles Gratis
          </button>
          <button
            onClick={() => onNavigate('comparte_contenido')}
            className="bg-brand-pink text-white font-bold py-3 px-8 rounded-full text-sm shadow-lg"
          >
            Ir a Comparte Contenido
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
